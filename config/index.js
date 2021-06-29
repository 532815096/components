var path = require('path')
let { ISMOCK } = require('./mock.conf')
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',
        productionSourceMap: false,
        devtool: '#source-map',
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        bundleAnalyzerReport: process.env.npm_config_report,
        assetsCDN: {
            css: [],
            js: []
        },
        prodExternals: {}
    },
    dev: {
        env: require('./dev.env'),
        port: 8888,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxy: {},
        proxyTable: ISMOCK ? {
            '/mock/': {
                target: 'http://localhost:8000',
                changeOrigin: true,
                ws: true,
                pathRewrite: {'^/mock/': ''},
            }
        }: {},
        cssSourceMap: true,
        ISMOCK
    },
    conmomPrams: {
        timeout: 6000,
        withCredentials: true
    }
}
