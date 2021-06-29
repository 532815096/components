var path = require('path');
var utils = require('./utils');
var webpack = require('webpack');
var config = require('../config');
var merge = require('webpack-merge');
var baseWebpackConfig = require('./webpack.base.conf');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
var UglifyJsPlugin = require('terser-webpack-plugin');
var HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
require('babel-polyfill');
var env = config.build.env;

var webpackConfig = merge(baseWebpackConfig, {
    module: {
        rules: utils.styleLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    devtool: config.build.productionSourceMap ? config.build.devtool : false,
    performance: {
        hints: false
    },
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[name].[chunkhash].js')
    },
    externals: config.build.prodExternals,
    optimization: {
        runtimeChunk: {
            name: 'manifest'
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: config.build.productionSourceMap,
                terserOptions: {
                    warnings: false,
                    compress: {
                        drop_console: true
                    }
                }
            }),
            new OptimizeCSSPlugin({
                cssProcessorOptions: config.build.productionSourceMap
                    ? {
                          safe: true,
                          map: {inline: false}
                      }
                    : {safe: true}
            })
        ],
        splitChunks: {
            chunks: 'all',
            maxInitialRequests: 4,
            cacheGroups: {
                vendors: {
                    name: 'vendors',
                    test: /[\\/]node_modules[\\/]/,
                    minChunks: 2,
                    priority: 10,
                    chunks: 'initial'
                },
                UI: {
                    name: 'chunk-UI',
                    priority: 20,
                    test: /[\\/]node_modules[\\/]_?kingdot(.*)/
                },
                commons: {
                    name: 'commons',
                    test: path.resolve(__dirname, 'src/components'),
                    minChunks: 1,
                    priority: 5,
                    reuseExistingChunk: true
                }
            }
        }
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/en/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        // 抽取CSS
        new MiniCssExtractPlugin({
            filename: utils.assetsPath('css/[name].[contenthash].css'),
            chunkFilename: utils.assetsPath('css/[name].[contenthash].css')
        }),
        // 打包缓存
        new HardSourceWebpackPlugin({
            //设置缓存目录的路径
            //相对路径或者绝对路径
            cacheDirectory: '../node_modules/.cache/hard-source/[confighash]',
            //构建不同的缓存目录名称
            //也就是cacheDirectory中的[confighash]值
            configHash: function(webpackConfig) {
                return require('node-object-hash')({sort: false}).hash(webpackConfig);
            },
            //环境hash
            //当loader、plugin或者其他npm依赖改变时进行替换缓存
            environmentHash: {
                root: process.cwd(),
                directories: [],
                files: ['package-lock.json', 'yarn.lock']
            },
            //自动清除缓存
            cachePrune: {
                //缓存最长时间（默认2天）
                maxAge: 2 * 24 * 60 * 60 * 1000,
                //所有的缓存大小超过size值将会被清除
                //默认50MB
                sizeThreshold: 50 * 1024 * 1024
            }
        }),
        // 压缩CSS
        new OptimizeCSSPlugin({
            cssProcessorOptions: {
                safe: true
            }
        }),
        // 初始化模板文件
        new HtmlWebpackPlugin({
            filename: config.build.index,
            template: 'index.html',
            inject: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            },
            cdn: config.build.assetsCDN
        }),
        // copy custom static assets
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, '../static'),
                to: config.build.assetsSubDirectory,
                ignore: ['.*']
            }
        ]),
        // webpack runtime 注入模板文件
        new InlineManifestWebpackPlugin('manifest')
    ]
});
// Gzip压缩
if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin');

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp('\\.(' + config.build.productionGzipExtensions.join('|') + ')$'),
            threshold: 10240,
            minRatio: 0.8
        })
    );
}
// 查看最终包大小
if (config.build.bundleAnalyzerReport) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
    webpackConfig.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = webpackConfig;
