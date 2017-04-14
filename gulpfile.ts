/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2017.d.ts" />
import * as _ from 'lodash';
import * as fs from 'fs';
import * as Path from 'path';
import { spawn } from 'child_process';
const gulp = require('gulp');
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
    const libs = `${buildPath}/libs.json`;
    if (fs.existsSync(libs)) {
        return done();
    }
    const proc = spawn('npm.cmd', ['run', 'build:vendor-libs'], { stdio: 'inherit' });
    proc.on('exit', () => {
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
