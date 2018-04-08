const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'build')
    },
    plugins: [new HtmlWebpackPlugin({
        filename: 'index.html',
        template: './src/static/template/index.tpl'
    })]
}