var path = require('path')
var utils = require('./utils')
var config = require('../config')
var webpack = require('webpack')
var vueLoaderConfig = require('./vue-loader.conf')
const betterProgress = require('better-webpack-progress');
require('babel-polyfill')
const autoprefixer = require('autoprefixer');
var HappyPack = require('happypack')
var os = require('os')
var happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length })

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    entry: {
        app: './src/main.js',
    },
    output: {
        path: config.build.assetsRoot,
        filename: '[name].js',
        publicPath: process.env.NODE_ENV === 'production'
            ? config.build.assetsPublicPath
            : config.dev.assetsPublicPath
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src'),
            '@config': resolve('config')
        }
    },
    plugins: [
        new webpack.ProgressPlugin(betterProgress({
            mode: 'compact',  // or 'detailed' or 'bar'
        })),
        new HappyPack({
          id: 'babel',
          loaders: [ 'babel-loader?cacheDirectory' ],
          threadPool: happyThreadPool,
          verbose: true
        }),
        // new HappyPack({
        //   id: 'eslint',
        //   loaders: [{
        //     loader: 'eslint-loader',
        //     options: {
        //       formatter: require('eslint-friendly-formatter')
        //     }
        //   }],
        //   threadPool: happyThreadPool,
        //   verbose: true
        // })
      ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: vueLoaderConfig,
                include: [resolve('src/')]
            },
            {
                test: /\.js$/,
                loader: 'happypack/loader?id=babel',
                include: [
                    resolve('src'),
                    resolve('test')
                ]
            },
            {
				test: /\.(styl)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							url: true
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							plugins: [
								autoprefixer({
									browsers: ['last 2 versions', 'ie >= 9']
								})
							]
						}
					},
					{
						loader: 'stylus-loader',
						options: {
							'include css': true,
							sourceMap: false,
							'resolve url': true,
							import: resolve('../node_modules/kpc/@stylus/styles/themes/ksyun/index.styl')
						}
					}
				]
			},
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            },
            {
                test: /\.otf|ttf|woff2?|eot(\?\S*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', '[name].[hash:7].[ext]')
                }
            }
        ]
    }
}
