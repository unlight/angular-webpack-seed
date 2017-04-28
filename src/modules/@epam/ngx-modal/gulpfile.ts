/// <reference path='../../../../node_modules/@types/node/index.d.ts' />
import * as _ from 'lodash';
import * as fs from 'fs';
import * as Path from 'path';
import assert = require('assert');
const spawn = require('cross-spawn');
const gulp = require('gulp');

gulp.task('build:lib', (done) => {
    const proc = spawn('npm', [...'run tsc --'.split(' '),
        `--project`, __dirname,
        `--outDir`, `${__dirname}/lib`,
    ], { stdio: 'inherit' });
    proc.once('exit', done);
});

gulp.task('build:source', (done) => {
    const proc = spawn('npm', [...'run tsc --'.split(' '),
        `--project`, __dirname,
        `--sourceMap`, 'false',
        `--outDir`, `${__dirname}/source`,
    ], { stdio: 'inherit' });
    proc.once('exit', done);
});

gulp.task('build:bundle:commonjs', () => {
    const mkdirp = require('mkdirp');
    mkdirp.sync('bundles');
    const proc = spawn('npm', [...'run -s jsfuse'.split(' '),
        `${__dirname}/source/index.js`
    ]);
    return proc.stdout.pipe(fs.createWriteStream('bundles/ngx-modal.commonjs.js'));
});
