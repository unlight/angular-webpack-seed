/// <reference path="node_modules/@types/node/index.d.ts" />
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as Path from 'path';
import _ = require('lodash');

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CssEntryPlugin = require('css-entry-webpack-plugin');
const aotLoader = require('@ultimate/aot-loader');
// NormalModuleReplacementPlugin example https://github.com/mateuszmazurek/NormalModuleReplacementPlugin-test/blob/master/webpack.config.js

const watchOptions = {
    aggregateTimeout: 150,
    ignored: /node_modules/,
};

interface Options {
    vendorLibs?: boolean;
    dashboard?: boolean;
    test?: boolean;
    coverage?: boolean;
    prod?: boolean;
    dev?: boolean;
    hmr?: boolean;
    aot?: boolean;
    vendorStyle?: boolean;
}

const defaultOptions = {
    vendorLibs: process.argv.indexOf('--env.vendorLibs') !== -1,
    vendorStyle: process.argv.indexOf('--env.vendorStyle') !== -1,
    dashboard: process.argv.indexOf('--env.dashboard') !== -1,
    test: false,
    coverage: false,
    prod: process.argv.indexOf('-p') !== -1 || process.argv.indexOf('--env.prod') !== -1,
    get dev() {
        return !this.prod;
    },
    get hmr() {
        return this.dev;
    },
    get aot() {
        return process.argv.indexOf('--env.aot') !== -1 || this.prod;
    }
};

const postPlugins = [
    // require('postcss-url')(), // plugin to rebase, inline or copy on url().
    require('autoprefixer')('last 3 versions'),
];

export = (options?: Options) => {
    options = _.merge({}, defaultOptions, options);
    const config: any = {
        context: context,
        entry: {
            app: './src/main.ts',
            libs: [
                'core-js/es6',
                'core-js/es7/reflect',
                'core-js/es7/array',
                'tslib',
                'zone.js/dist/zone',
                'rxjs',
                '@angular/common',
                '@angular/compiler',
                '@angular/core',
                '@angular/forms',
                '@angular/http',
                '@angular/platform-browser',
                '@angular/platform-browser-dynamic',
                '@angular/router',
                // HMR related
                '@angularclass/hmr',
                'webpack-dev-server/client',
                'events',
            ],
            style: ['@blueprintjs/core/dist/blueprint.css']
        },
        output: {
            path: buildPath,
            publicPath: '',
            filename: (() => {
                if (options.prod) return '[name]-[hash:6].js';
                return '[name].js';
            })()
        },
        devtool: (() => {
            if (options.test) return 'inline-source-map';
            if (options.prod) return 'source-map';
            return false;
        })(),
        devServer: {
            noInfo: false,
            contentBase: [buildPath],
            port: 8087,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'normal',
            // stats: { reasons: true, maxModules: 10000 },
            watchOptions: watchOptions,
        },
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty',
            // Buffer: false,
        },
        target: 'web',
        resolve: {
            extensions: ['.ts', '.js'],
        },
        watchOptions: watchOptions,
        module: {
            exprContextCritical: false,
            rules: [
                {
                    test: /\.ts$/,
                    use: (() => {
                        if (options.aot) {
                            return [{ loader: '@ultimate/aot-loader' }];
                        }
                        return [
                            ...(options.hmr ? [{ loader: '@angularclass/hmr-loader' }] : []),
                            {
                                loader: 'awesome-typescript-loader',
                                options: {
                                    useTranspileModule: true,
                                    isolatedModules: true,
                                    transpileOnly: true,
                                }
                            },
                            { loader: 'angular2-template-loader' }
                        ]
                    })(),
                },
                {
                    test: /\.component\.html$/,
                    use: [
                        { loader: 'raw-loader' }
                    ]
                },
                {
                    test: /index\.ejs$/,
                    use: [
                        { loader: 'ejs-loader' },
                    ]
                },
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'css-loader' }
                    ]
                },
                {
                    test: /\.component\.scss$/,
                    use: [
                        { loader: 'raw-loader' },
                        { loader: 'postcss-loader', options: { plugins: postPlugins } },
                        { loader: 'sass-loader' },
                    ]
                },
                {
                    test: /\.scss$/,
                    exclude: /\.component\.scss$/,
                    use: [
                        { loader: 'style-loader' },
                        { loader: 'css-loader' },
                        { loader: 'postcss-loader', options: { plugins: postPlugins } },
                        { loader: 'sass-loader' },
                    ]
                },
                {
                    test: /\.(woff|woff2|eot|ttf)$/,
                    use: [
                        { loader: 'file-loader', options: { name: 'i/[name]-[hash:6].[ext]' } }
                    ]
                },
                ...(options.coverage ? [
                    {
                        enforce: 'post',
                        test: /\.ts$/,
                        loader: 'istanbul-instrumenter-loader',
                        exclude: [
                            /\.spec\.ts$/,
                            /node_modules/
                        ]
                    }
                ] : [])
            ],
        },
        plugins: (() => {
            const result: any[] = [
                new webpack.WatchIgnorePlugin([
                    /node_modules/
                ])
            ];
            if (options.dashboard) {
                result.push(new DashboardPlugin());
            }
            if (options.hmr) {
                result.push(new webpack.NamedModulesPlugin());
            }
            if (!options.test) {
                result.push(new HtmlWebpackPlugin({
                    template: './src/index.ejs',
                    minify: false,
                    excludeChunks: [],
                    config: options,
                }));
            }
            if (options.aot) {
                result.push(new aotLoader.AotPlugin({
                    tsConfig: './tsconfig.json',
                    entryModule: `./src/app/app.module#AppModule` // path is relative to tsConfig above
                }));
            }
            if (options.prod) {
                result.push(
                    new webpack.optimize.UglifyJsPlugin({ sourceMap: true, comments: false }),
                    new webpack.LoaderOptionsPlugin({
                        minimize: true,
                        debug: false,
                        options: { context }
                    }),
                    new webpack.DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    })
                );
            }
            return result;
        })()
    };

    if (options.vendorLibs) {
        _.assign(config, {
            entry: _.pick(config.entry, ['libs']), // check name near DllReferencePlugin
            devtool: 'source-map',
            output: {
                path: buildPath,
                filename: '[name].js',
                library: '[name]',
            },
            plugins: [
                new webpack.DllPlugin({
                    name: '[name]',
                    path: `${buildPath}/[name].json`
                })
            ]
        });
        config.module.rules = [];
    } else if (options.vendorStyle) {
        const rules = config.module.rules;
        _.assign(config, {
            entry: _.pick(config.entry, ['style']),
            module: {
                rules: rules.filter(x => String(x.test).indexOf('woff|woff2|eot|ttf') !== -1
                    || String(x.test).indexOf('.css$') !== -1),
            },
            plugins: [
                new CssEntryPlugin({
                    output: { filename: '[name].css' }
                })
            ]
        });
    } else {
        config.entry = _.pick(config.entry, ['app']);
        if (options.test) {
            config.entry = 'lodash/noop';
        }
        if (options.dev) {
            const libs = `${buildPath}/libs.json`; // check name in src/index.ejs
            if (!fs.existsSync(libs)) {
                throw new Error(`Cannot link '${libs}', file do not exists.`);
            }
            config.plugins.push(
                new webpack.DllReferencePlugin({
                    context: context,
                    manifest: require(libs)
                })
            );
        }
    }

    return config;
};
