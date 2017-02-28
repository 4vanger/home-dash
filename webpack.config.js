var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
    entry: './src/js/main.js',
    output: {
        path: 'dist',
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Family Dashboard'
        }),
    ],
    module: {
        loaders: [
            {
                test: /\.html$/,
                loader: 'ng-cache-loader?module=DashTemplates'
            }
        ]
    }
};
module.exports = webpackConfig;