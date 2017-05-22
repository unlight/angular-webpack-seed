/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2017.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.dom.d.ts" />
import * as _ from 'lodash';
import * as fs from 'fs';
import * as Path from 'path';
import { Application } from '@types/express';;
import assert = require('assert');
const gulp = require('gulp');
const glob = require('glob');
const g = require('gulp-load-plugins')();
const buildPath = Path.join(__dirname, 'build');

function sourceLint() {
    return g.eslint();
}

function specLint() {
    return g.eslint({
        rules: {
            'lodash/import-scope': 0,
            'prefer-const': 0,
            'import/no-duplicates': 0,
        }
    });
}

gulp.task('eslint', () => {
    return gulp.src('src/**/*.ts', { since: g.memoryCache.lastMtime('ts') })
        .pipe(g.memoryCache('ts'))
        .pipe(g.ignore.exclude('*.d.ts'))
        .pipe(g.if('*.spec.ts', specLint(), sourceLint()))
        .pipe(g.eslint.format());
});

gulp.task('eslint:watch', (done) => {
    let w = gulp.watch('src/**/*.ts', { ignoreInitial: false }, gulp.series('eslint'));
    w.on('change', g.memoryCache.update('ts'));
    process.on('SIGINT', () => {
        w.close();
        done();
    });
});

gulp.task('server:prestart', done => {
    const objectDiff = require('object-diff');
    const spawn = require('cross-spawn');
    const readPkgUp = require('read-pkg-up');
    const { version, dependencies } = readPkgUp.sync().pkg;
    const currentLibsInfo = Object.assign({}, { version }, dependencies);
    const libsInfoFile = Path.resolve('node_modules', '.libs.build.json');
    if (fs.existsSync(`${buildPath}/libs.json`) && fs.existsSync(libsInfoFile)) {
        const prevLibsInfo = require(libsInfoFile);
        const d = objectDiff(prevLibsInfo, currentLibsInfo);
        const hasDifference = _.keys(d).length > 0;
        if (!hasDifference) {
            return done();
        }
        g.util.log(g.util.colors.yellow('Version changed or found changes in dependencies, rebuilding npm libs'));
        _.forEach(d, (version, pkname) => g.util.log(`${pkname} ${g.util.colors.cyan(version)}`));
    } else {
        g.util.log(g.util.colors.yellow('Initial build of npm libs'));
    }
    let p = new Promise((resolve, reject) => {
        const proc = spawn('npm', ['run', 'build:libs'], { stdio: 'inherit' });
        proc.on('error', reject);
        proc.once('exit', () => {
            fs.writeFileSync(libsInfoFile, JSON.stringify(currentLibsInfo));
            resolve();
        });
    });
    let [style] = glob.sync(`${buildPath}/style*.css`);
    if (!style) {
        p = p.then(() => new Promise((resolve, reject) => {
            g.util.log(g.util.colors.yellow('Initial style build'));
            const proc = spawn('npm', ['run', 'build:style'], { stdio: 'inherit' });
            proc.on('error', reject);
            proc.once('exit', resolve);
        }));
    }
    return p;
});

gulp.task('check:build:prod', () => {
    let paths = glob.sync(`${buildPath}/app*.js`);
    if (paths.length === 0) {
        return Promise.reject('build:prod task did not produce app javascript file.');
    }
    return Promise.resolve();
});

gulp.task('test:int', () => {
    const express = require('express');
    const app: Application = express();
    app.use(express.static(buildPath));
    const server = app.listen(2345);
    const nightmare = require('nightmare')({});
    return nightmare
        .wait(1000)
        .goto('http://localhost:2345')
        .wait('a[ng-reflect-router-link=welcome]')
        .click('a[ng-reflect-router-link=welcome]')
        .evaluate(() => {
            let h = document.querySelector('h3');
            return h && h.innerText;
        })
        .end()
        .then(result => {
            assert.equal(result, 'Welcome');
            server.close();
        })
        .catch(err => Promise.reject(String(err)));
});

gulp.task('stryker:source', () => {
    gulp.src('src/**/!(*.ts)', { base: 'src' })
        .pipe(gulp.dest(`${buildPath}/source`));
    let { compilerOptions } = require('./tsconfig.json');
    Object.assign(compilerOptions, {
        target: 'es6',
        sourceMap: false,
        declaration: false,
        isolatedModules: true,
        outDir: `${buildPath}/source`,
    });
    return gulp.src(['src/**/*.ts', 'src/spec.module.js'])
        .pipe(g.typescript(compilerOptions))
        .pipe(gulp.dest(`${buildPath}/source`));
});

gulp.task('killzombie', () => {
    if (process.platform === 'win32') {
        const fkill = require('fkill');
        return fkill('electron.exe', { force: true });
    } else {
        return Promise.resolve();
    }
});
