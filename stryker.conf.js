const webpack = require('webpack');
const Path = require('path');

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
        reporter: ['progress', 'html'],
        htmlReporter: {
            baseDir: '.testresults/mutation'
        },
        // logLevel: 'debug',
        maxConcurrentTestRunners: 1,
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
