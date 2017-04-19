const webpack = require('webpack');
const Path = require('path');

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const libs = `${buildPath}/libs.json`; // check name in src/index.ejs

var CustomMiddlewareFactory = function(config) {
    var glob = require('glob');
    var Path = require('path');
    var fs = require('fs');
    var sourcePath = `D:/My/Dev/angular-webpack-seed/src`;
    return function(request, response) {
        var name = Path.basename(request.originalUrl);
        var [file] = glob.sync(`${sourcePath}/**/${name}`);
        response.writeHead(200);
        response.end(fs.readFileSync(file));
    }
}

module.exports = function(config) {
    config.set({
        files: [
            // { pattern: 'build/source/**/*.component.js', mutated: true, included: false },
            // { pattern: 'build/source/**/stryker.component.js', mutated: true, included: false },
            // { pattern: 'build/source/**/app.component.js', mutated: true, included: false },
            { pattern: 'build/source/**/!(*.spec|main|spec.module).js', mutated: true, included: false },
            { pattern: 'build/source/**/*.spec.js', mutated: false, included: false },
            // { pattern: 'src/**/*.scss', included: false, mutated: false },
            // { pattern: 'src/**/*.html', included: false, mutated: false },
            'build/source/spec.module.js',
        ],
        testRunner: 'karma',
        testFramework: 'jasmine',
        coverageAnalysis: 'perTest',
        reporter: ['clear-text', 'html', 'progress'],
        htmlReporter: {
            baseDir: '.testresults/mutation' // this is the default
        },
        // logLevel: 'trace',
        maxConcurrentTestRunners: 1,
        clearTextReporter: {
            maxTestsToLog: 0
        },
        karmaConfig: {
            preprocessors: {
                // '**/stryker.component.spec.js': ['webpack'],
                '**/spec.module.js': ['webpack'],
            },
            middleware: ['custom'],
            // frameworks: ['jasmine'],
            plugins: [
                'karma-webpack',
                'karma-jasmine',
                'karma-nightmare',
                { 'middleware:custom': ['factory', CustomMiddlewareFactory] },
            ],
            browsers: ['Nightmare'],
            // proxies: {
            //     '/img/': '/base/test/images/',
            // },
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
