/// <reference path="node_modules/@types/node/index.d.ts" />
import * as webpack from 'webpack';
import * as fs from 'fs';
import * as Path from 'path';
import _ = require('lodash');
const format = require('fmt-obj');

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const DashboardPlugin = require('webpack-dashboard/plugin');
const CssEntryPlugin = require('css-entry-webpack-plugin');
const aotLoader = require('@ultimate/aot-loader');

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
        },
        output: {
            path: buildPath,
            publicPath: '',
            filename: '[name].js',
        },
        devtool: (() => {
            if (options.test) return 'inline-source-map';
            if (options.prod) return 'source-map';
            return false;
        })(),
        target: 'web',
        resolve: {
            extensions: ['.ts', '.js'],
            // Fix webpack's default behavior to not load packages with jsnext:main module
            mainFields: [
                ...(options.prod ? ['jsnext:main'] : []),
                'browser',
                'main'
            ]
        },
        watchOptions: watchOptions,
        module: {
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
                                    transpileOnly: true,
                                }
                            }
                        ]
                    })(),
                },
                {
                    test: /\.component\.html$/,
                    loader: 'raw-loader',
                },
                {
                    test: /index\.html$/,
                    loader: 'html-loader',
                    options: { minimize: false },
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
                        // { loader: 'to-string' },
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
                    test: /\.(woff|woff2|eot|ttf)?$/,
                    loader: 'file-loader',
                    options: {
                        name: 'i/[name]-[hash:6].[ext]'
                    }
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
                result.push(new HtmlWebpackPlugin({ template: 'src/index.html', minify: false }));
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
        })(),
        devServer: {
            noInfo: false,
            contentBase: [buildPath],
            port: 8087,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: 'normal',
            watchOptions: watchOptions,
        },
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty',
            // Buffer: false,
        }
    };

    if (options.vendorLibs) {
        _.assign(config, {
            entry: {
                vendorLibs: [
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
                ],

            },
            devtool: 'source-map',
            output: {
                path: buildPath,
                filename: '[name].js',
                library: '[name]',
            }
        });
        config.plugins.unshift(
            new webpack.DllPlugin({
                name: '[name]',
                path: `${buildPath}/[name].json`
            })
        );
    } else if (options.vendorStyle) {
        const rules = config.module.rules;
        _.assign(config, {
            entry: {
                style: ['@blueprintjs/core/dist/blueprint.css']
            },
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
        config.plugins.push(
            new webpack.DllReferencePlugin({
                context: context,
                manifest: (manifest => fs.existsSync(manifest) ? require(manifest) : {})(`${buildPath}/vendorLibs.json`)
            })
        );
    }

    return config;
};
