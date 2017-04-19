module.exports = function(config) {
    config.set({
        files: [
            { pattern: 'stryker-test-source/**/*.component.js', mutated: true, included: true },
            'stryker-test-source/**/*.spec.js',
        ],
        // testRunner: 'mocha',
        // testFramework: 'mocha',
        testRunner: 'karma',
        testFramework: 'jasmine',
        coverageAnalysis: 'perTest',
        reporter: ['clear-text', 'progress'],
        logLevel: 'debug',
        maxConcurrentTestRunners: 1,
        karmaConfig: {
            preprocessors: {
                '**/*.js': ['webpack']
            },
            browsers: ['Nightmare'],
        },
        // karmaConfigFile: 'karma.conf.ts' // <-- add your karma.conf.js file here
        // mutate: [
        //     'src/**/*.js' // <-- mark files for mutation here
        // ]
    });
}
