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
            { pattern: 'src/i18n/*.json', included: false },
            { pattern: 'build/libs.js', watched: false },
            { pattern: 'src/spec.module.js' },
        ],
        preprocessors: {
            '**/spec.module.js': ['webpack', 'sourcemap']
        },
        browsers: ['Nightmare'],
        frameworks: [
            'jasmine',
        ],
        reporters: ['progress'],
    });

    config.set({
        proxies: {
            '/i18n': '/base/src/i18n',
        },
        mime: {
            'text/x-typescript': ['ts', 'tsx'],
        },
        nightmareOptions: {
            width: 800,
            height: 600,
            show: false,
            devTools: false
        },
        webpack: webpackConfig({ hmr: false, test: true }),
        webpackMiddleware: {
            stats: 'minimal'
        }
    });

    if (process.argv.indexOf('--coverage') !== -1) {
        const testResultsOutput = __dirname + '/.testresults';
        config.set({
            reporters: ['mocha', 'html', 'junit', 'coverage', 'remap-coverage'],
            coverageReporter: {
                type: 'in-memory'
            },
            remapCoverageReporter: {
                'text-summary': null,
                json: `${testResultsOutput}/coverage.json`,
                html: `${testResultsOutput}/coverage`
            },
            htmlReporter: {
                outputDir: testResultsOutput,
                namedFiles: true,
                reportName: 'index',
                pageTitle: 'jstest',
            },
            junitReporter: {
                outputDir: testResultsOutput,
                outputFile: 'junit.xml',
                useBrowserName: false
            },
            webpack: webpackConfig({ hmr: false, test: true, coverage: true }),
        });
    }
};
