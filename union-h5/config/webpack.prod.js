/**
 * 生产环境配置
 */

const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.base.js')

const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    mode: 'production',
    output: {
        // 线上静态文件目录
        publicPath: '//static.iqiyi.com/js/common/',
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js'
    },
    plugins: [
        // 代码压缩
        new UglifyJsPlugin({
            parallel: true,
            uglifyOptions: {
                ecma: 8,
                output: {
                    comments: false,
                    beautify: false
                }
            }
        }),
        // 清空旧构建文件
        new CleanWebpackPlugin(['build'], {
            root: path.resolve(__dirname, '..')
        }),
        // 编译模板文件
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/static/tpl/index.tpl')
        }),
        // 模块标识符
        new webpack.HashedModuleIdsPlugin()
    ]
})