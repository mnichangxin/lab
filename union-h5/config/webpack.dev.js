/**
 * 开发环境配置
 */

const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')

module.exports = merge(common, {
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        // 本地静态文件目录
        publicPath: '/build/',
        filename: '[name].js',
        chunkFilename: '[name].js'
    },
    // 启用 Webpack 服务器
    devServer: {
        contentBase: path.resolve(__dirname, '../public'),
        publicPath: '/build/',
        port: 80,
        historyApiFallback: true,
        disableHostCheck: true
    },
})