const webpack = require('webpack');
const Path = require('path');

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const libs = `${buildPath}/libs.json`; // check name in src/index.ejs

module.exports = function(config) {
    config.set({
        files: [
            { pattern: 'build/source/**/stryker.component.js', mutated: true, included: false },
            'build/source/**/stryker.component.spec.js',
        ],
        // testRunner: 'mocha',
        // testFramework: 'mocha',
        testRunner: 'karma',
        testFramework: 'jasmine',
        coverageAnalysis: 'perTest',
        // coverageAnalysis: 'all',
        reporter: ['clear-text', 'progress'],
        // logLevel: 'trace',
        // logLevel: 'debug',
        maxConcurrentTestRunners: 1,
        karmaConfig: {
            preprocessors: {
                '**/*.spec.js': ['webpack'],
            },
            browsers: ['Nightmare'],
            webpack: {
                //     // entry: 'lodash/noop',
                // target: 'web',
                module: {
                    exprContextCritical: false,
                },
                //     plugins: [
                //         new webpack.DllReferencePlugin({
                //             context: context,
                //             manifest: require(libs)
                //         })
                //     ]
            }
        },
        // karmaConfigFile: 'karma.conf.ts' // <-- add your karma.conf.js file here
        // mutate: [
        //     'src/**/*.js' // <-- mark files for mutation here
        // ]
    });
}
