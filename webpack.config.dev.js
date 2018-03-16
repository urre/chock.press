const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const postcssUrl = require('postcss-url');

module.exports = {
	devtool: 'source-map',
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/dev-server',
		'./src/index'
	],
	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js'
	},
	devServer: {
		contentBase: './build',
		hot: true,
		colors: true,
		inline: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new ExtractTextPlugin('[name].css', {
			allChunks: true
		}),
		new HtmlWebpackPlugin({
			template: './src/index.html'
		})
	],
	postcss: function(webpack) {
		return [
			postcssUrl(),
			autoprefixer({
				browsers: ['last 2 versions']
			})
		]
	},
	module: {
		loader: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: 'babel-loader'
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract(
					'style-loader',
					'!css-loader?sourceMap&importLoaders=1!postcss-loader'
				)
			},
			{
				test: /\.html$/,
				loaders: 'raw!html-minify'
			},
			{
				test: /\.(jpe?g|png|gif|svg)$/,
				exclude: /(node_modules)/,
				loaders: 'url-loader?limit=10000'
			}
		]
	}
}