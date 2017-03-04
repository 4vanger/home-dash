var webpack = require("webpack");
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackConfig = {
	entry: './src/entry.js',
	output: {
		path: 'dist',
		filename: 'main.js',
	},
	resolve: {
		alias: {
			partials: path.resolve(__dirname, 'src/partials/'),
		},
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Family Dashboard',
			hash: true,
			template: './html-webpack-template.ejs',
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						// loader: 'ng-cache-loader?module=DashTemplates',
						loader: 'raw-loader',
					},
				],
			},
			{
				test: /\.sass$/,
				use: [
					{
						loader: "style-loader", // creates style nodes from JS strings
					},
					{
						loader: "css-loader",// translates CSS into CommonJS
						options: {
							sourceMap: true,
						},
					},
					{
						loader: "sass-loader", // compiles Sass to CSS
						options: {
							// includePaths: ['src/sass/main.sass',],
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|woff|woff2|eot|ttf|svg)$/,
				use: {
					loader: 'url-loader?limit=100000',
				},
			},
		],
	},
	watchOptions: {
		ignored: '/node_modules/',
	},
};

module.exports = webpackConfig;