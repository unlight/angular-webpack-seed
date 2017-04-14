/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2017.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.dom.d.ts" />
import * as _ from 'lodash';
import * as fs from 'fs';
import * as Path from 'path';
import { spawn } from 'child_process';
const gulp = require('gulp');
const readPkgUp = require('read-pkg-up');
const g = require('gulp-load-plugins')();
const args = g.util.env;
const buildPath = Path.join(__dirname, 'build');

gulp.task('eslint', () => {
    return gulp.src('src/**/*.ts', { since: g.memoryCache.lastMtime('ts') })
        .pipe(g.memoryCache('ts'))
        .pipe(g.eslint())
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
    const version = readPkgUp.sync().pkg.version;
    const libsInfoFile = Path.resolve('node_modules', '.vendor-libs.build.json');
    const libs = `${buildPath}/libs.json`;
    if (fs.existsSync(libs) && fs.existsSync(libsInfoFile)) {
        const libsInfo = require(libsInfoFile);
        if (version === (libsInfo && libsInfo.version)) {
            return done();
        }
    }
    const proc = spawn('npm.cmd', ['run', 'build:vendor-libs'], { stdio: 'inherit' });
    proc.once('exit', () => {
        fs.writeFileSync(libsInfoFile, JSON.stringify({ version }));
        done();
    });
});

gulp.task('check:build:prod', () => {
    const globby = require('globby');
    return globby(`${buildPath}/app*.js`).then(paths => {
        if (paths.length === 0) {
            return Promise.reject('build:prod task did not produce app javascript file.');
        }
    });
});

import express = require('express');
import assert = require('assert');

gulp.task('test:int', () => {
    const app = express();
    app.use(express.static(buildPath));
    const server = app.listen(2345);
    const nightmare = require('nightmare')({ });
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
