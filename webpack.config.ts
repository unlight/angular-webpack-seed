/// <reference path="node_modules/@types/node/index.d.ts" />
import * as fs from 'fs';
import * as Path from 'path';
import _ = require('lodash');

const WatchIgnorePlugin = require('webpack/lib/WatchIgnorePlugin');
const NamedModulesPlugin = require('webpack/lib/NamedModulesPlugin');
const readPkgUp = require('read-pkg-up');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
// NormalModuleReplacementPlugin example https://github.com/mateuszmazurek/NormalModuleReplacementPlugin-test/blob/master/webpack.config.js

const sourcePath = Path.join(__dirname, 'src');
const buildPath = Path.join(__dirname, 'build');
const context = __dirname;

const watchOptions = {
    aggregateTimeout: 150,
    ignored: /node_modules/,
};

interface Options {
    libs?: boolean;
    dashboard?: boolean;
    test?: boolean;
    coverage?: boolean;
    prod?: boolean;
    dev?: boolean;
    hmr?: boolean;
    aot?: boolean;
    style?: boolean;
}

const defaultOptions = {
    libs: process.argv.indexOf('--env.libs') !== -1,
    style: process.argv.indexOf('--env.style') !== -1,
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
    // require('postcss-import')(),
    // require('postcss-flexbox')(),
    require('autoprefixer')({ browsers: 'last 3 versions' }),
];

export = (options: Options = {}) => {
    options = _.merge({}, defaultOptions, options);
    _.each(options, (value, key) => (value) ? process.stdout.write(`${key} `) : null);
    let stats = {
        version: false,
        maxModules: 0,
        children: false,
    };
    let cssLoaderOptions: any = {
        sourceMap: true,
        minimize: options.prod,
    };
    const config: any = {
        context: context,
        entry: {
            app: './src/main.ts',
            libs: (() => {
                let dependencies = Object.keys(readPkgUp.sync().pkg.dependencies);
                _.pull(dependencies, 'core-js', 'zone.js'); // We do not need all from there
                return _.uniq([
                    'core-js/es6',
                    'core-js/es7/reflect',
                    'core-js/es7/array',
                    'zone.js/dist/zone',
                    ...dependencies,
                    // HMR related
                    '@angularclass/hmr',
                    'webpack-dev-server/client',
                    'webpack/hot/emitter',
                    'webpack/hot/log-apply-result',
                    // 'webpack/hot/dev-server', // DONT! It will break HMR
                    'events',
                    // Css related
                    'base64-js',
                    'buffer',
                    'ieee754',
                    'css-loader/lib/css-base',
                    'style-loader/addStyles',
                    'style-loader/fixUrls',
                ]);
            })(),
            style: ['./src/style.scss'],
        },
        output: {
            path: buildPath,
            publicPath: '',
            chunkFilename: (() => {
                if (options.prod) return '[name]-[hash:6].js';
                return '[name].js';
            })(),
            filename: (() => {
                if (options.prod) return '[name]-[hash:6].js';
                return '[name].js';
            })(),
        },
        devtool: (() => {
            if (options.test) return 'inline-source-map';
            if (options.prod) return 'source-map';
            return 'cheap-source-map';
        })(),
        devServer: {
            https: false,
            overlay: true,
            noInfo: false,
            contentBase: [buildPath, sourcePath],
            port: 8087,
            historyApiFallback: true,
            hot: true,
            inline: true,
            stats: stats,
            // stats: { reasons: true, maxModules: 10000 },
            watchOptions: watchOptions,
        },
        stats: stats,
        node: {
            // workaround for webpack-dev-server issue
            // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
            fs: 'empty',
            net: 'empty',
            buffer: false,
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
                            { loader: 'angular-router-loader' },
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
                    test: /\.component\.css$/,
                    use: [
                        ...(options.aot ? [{ loader: 'raw-loader' }] : [{ loader: 'css-to-string-loader' }]),
                        { loader: 'css-loader', options: { importLoaders: 1 } },
                        { loader: 'postcss-loader', options: { plugins: postPlugins } },
                    ]
                },
                {
                    test: /\.css$/,
                    exclude: /\.component\.css$/,
                    use: [
                        { loader: 'css-loader', options: cssLoaderOptions }
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
                    use: (() => {
                        let result = [
                            { loader: 'css-loader', options: { importLoaders: 2, sourceMap: false, minimize: options.prod } },
                            { loader: 'postcss-loader', options: { plugins: postPlugins, sourceMap: false } },
                            { loader: 'sass-loader', options: { sourceMap: false } },
                        ];
                        if (!options.style) {
                            result.unshift({ loader: 'style-loader', options: { sourceMap: false } });
                        }
                        return result;
                    })(),
                },
                {
                    test: /\.(woff|woff2|eot|ttf|png|svg)$/,
                    use: [
                        { loader: 'file-loader', options: { name: `i/[name]${options.prod ? '-[hash:6]' : ''}.[ext]` } }
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
                new WatchIgnorePlugin([
                    /node_modules/
                ])
            ];
            if (options.dashboard) {
                const DashboardPlugin = require('webpack-dashboard/plugin');
                result.push(new DashboardPlugin());
            }
            if (options.hmr) {
                result.push(new NamedModulesPlugin());
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
                const { AotPlugin } = require('@ultimate/aot-loader');
                result.push(new AotPlugin({
                    tsConfig: './tsconfig.json',
                    entryModule: `./src/app/app.module#AppModule` // path is relative to tsConfig above
                }));
            }
            if (options.prod) {
				const CopyWebpackPlugin = require('copy-webpack-plugin');
                const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');
                const LoaderOptionsPlugin = require('webpack/lib/LoaderOptionsPlugin');
                const DefinePlugin = require('webpack/lib/DefinePlugin');
                result.push(
                    new UglifyJsPlugin({ sourceMap: true, comments: false }),
                    new LoaderOptionsPlugin({
                        minimize: true,
                        debug: false,
                        options: { context }
                    }),
                    new DefinePlugin({
                        'process.env.NODE_ENV': JSON.stringify('production')
                    }),
                    new CopyWebpackPlugin([
                        { from: 'src/i18n', to: 'i18n' } // `from` is relative to context, `to` is relative to output
                    ], { debug: 'info' }),
                );
            }
            if (options.prod) {
                result.push(
                    new ExtractTextPlugin({
                        filename: (get) => get('[name]-[contenthash:6].css')
                    })
                );
            }
            return result;
        })()
    };

    if (options.libs) {
        const DllPlugin = require('webpack/lib/DllPlugin');
        _.assign(config, {
            entry: _.pick(config.entry, ['libs']), // check name near DllReferencePlugin
            devtool: 'source-map',
            output: {
                path: buildPath,
                filename: '[name].js',
                library: '[name]',
            },
            plugins: [
                new DllPlugin({
                    name: '[name]',
                    path: `${buildPath}/[name].json`
                })
            ]
        });
        config.module.rules = [];
    } else if (options.style) {
        const CssEntryPlugin = require('css-entry-webpack-plugin');
        const rules: any[] = config.module.rules;
        _.assign(config, {
            entry: _.pick(config.entry, ['style']),
            plugins: [
                new CssEntryPlugin({
                    output: {
                        filename: `[name]${options.prod ? '-[contenthash:6]' : ''}.css`
                    }
                })
            ]
        });
    } else {
        config.entry = _.pick(config.entry, ['app']);
        if (options.test) {
            config.entry = false;
        }
        if (options.dev) {
            const DllReferencePlugin = require('webpack/lib/DllReferencePlugin');
            const libs = `${buildPath}/libs.json`; // check name in src/index.ejs
            if (!fs.existsSync(libs)) {
                throw new Error(`Cannot link '${libs}', file do not exists.`);
            }
            config.plugins.push(
                new DllReferencePlugin({
                    context: context,
                    manifest: require(libs)
                })
            );
        }
        const AssetInjectHtmlWebpackPlugin = require('asset-inject-html-webpack-plugin');
        const glob = require('glob');
        let [style] = glob.sync(`${buildPath}/style*.css`);
        if (!style) {
            throw new Error('Style not found, make sure that you build it.');
        }
        config.plugins.push(
            new AssetInjectHtmlWebpackPlugin({
                assets: {
                    style: Path.basename(style),
                    libs: 'libs.js',
                },
                args: options,
            })
        );
    }

    return config;
};
