/**
 * 通用配置
 */

const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, '..'),
    entry: {
        'union_h5.app': './src/app.js'
    },
    output: {
        path: path.resolve(__dirname, '../build')
    },
    optimization: {
        // 分割代码和依赖包
        splitChunks: {
            name: 'union_h5.vendor',
            chunks: 'all'
        },
        runtimeChunk: {
            name: 'union_h5.manifest'
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader'
            },
            {
                test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
                loader: 'url-loader?limit=50000'
            },
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader'
                }]
            }
        ]
    }
}