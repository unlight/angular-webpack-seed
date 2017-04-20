const webpack = require('webpack');
const Path = require('path');

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const libs = `${buildPath}/libs.json`; // check name in src/index.ejs

module.exports = function(config) {
    config.set({
        files: [
            { pattern: 'build/source/**/!(*.spec|main|spec.module).js', mutated: true, included: false },
            { pattern: 'build/source/**/*.spec.js', mutated: false, included: false },
            { pattern: 'build/source/**/*.{scss,html}', included: false, mutated: false },
            'build/source/spec.module.js', // { pattern: 'pattern', included: true, mutated: false }
        ],
        testRunner: 'karma',
        testFramework: 'jasmine',
        coverageAnalysis: 'perTest',
        reporter: ['clear-text', 'html', 'progress'],
        htmlReporter: {
            baseDir: '.testresults/mutation'
        },
        // logLevel: 'trace',
        maxConcurrentTestRunners: 2,
        clearTextReporter: {
            maxTestsToLog: 0
        },
        karmaConfig: {
            preprocessors: {
                '**/spec.module.js': ['webpack'],
            },
            browsers: ['Nightmare'],
            webpack: {
                module: {
                    exprContextCritical: false,
                    rules: [
                        {
                            test: /\.component\.html$/,
                            use: ['raw-loader'],
                        },
                        {
                            test: /\.component\.scss$/,
                            use: ['raw-loader', 'sass-loader'],
                        },
                        {
                            test: /\.component\.[tj]s$/,
                            use: ['angular2-template-loader'],
                        }
                    ]
                },
                // plugins: [
                //     new webpack.DllReferencePlugin({
                //         context: context,
                //         manifest: require(libs)
                //     })
                // ]
            }
        },
        // karmaConfigFile: 'karma.conf.ts' // <-- add your karma.conf.js file here
        // mutate: [
        //     'src/**/*.js' // <-- mark files for mutation here
        // ]
    });
}
