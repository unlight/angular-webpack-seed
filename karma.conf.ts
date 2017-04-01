/// <reference path="node_modules/@types/node/index.d.ts" />
/// <reference path="node_modules/typescript/lib/lib.es2017.d.ts" />
import * as _ from 'lodash';
import { Config } from 'karma';
import { Configuration } from 'webpack';
import webpackConfig = require('./webpack.config');

export = (config: any) => {

    const karma: Config = config;

    karma.set({
        files: [
            { pattern: 'build/vendors.js', watched: false },
            { pattern: 'src/specs.ts' },
        ],
        preprocessors: {
            '**/specs.ts': ['webpack', 'sourcemap']
        },
        browsers: ['Nightmare'],
        frameworks: [
            'jasmine',
        ],
        reporters: ['progress'],
    });

    config.set({
        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },
        nightmareOptions: {
            width: 800,
            height: 600,
            show: false,
        },
        webpack: webpackConfig({ hmr: false, test: true }),
        webpackMiddleware: {
            stats: 'minimal'
        }
    });

    if (process.argv.indexOf('--coverage') !== -1) {
        config.set({
            preprocessors: {
                '**/specs.ts': ['coverage', 'webpack', 'sourcemap']
            },
            reporters: ['mocha', 'coverage', 'remap-coverage'],
            coverageReporter: {
                type: 'in-memory'
            },
            remapCoverageReporter: {
                'text-summary': null,
                json: '.testresults/coverage.json',
                html: '.testresults/coverage'
            },
            webpack: webpackConfig({ hmr: false, test: true, coverage: true }),
        });
    }
};
