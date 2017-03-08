const webpack = require("webpack");
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
let webpackConfig = {
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
			inject: false,
		}),
	],
	module: {
		rules: [
			{
				test: /\.html$/,
				use: [
					{
						loader: 'ng-cache-loader?module=DashTemplates',
						// loader: 'raw-loader',
					},
				],
			},
			{
				test: /\.js/,
				use: [
					{
						// annotate angular DI injections so files can be minimized safely
						loader: 'ng-annotate-loader',
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