/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2017.d.ts" />
import * as _ from 'lodash';
import * as fs from 'fs';
import * as Path from 'path';
const gulp = require('gulp');
const g = require('gulp-load-plugins')();
const args = g.util.env;

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
