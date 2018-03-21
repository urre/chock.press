const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
	entry: ['react-hot-loader/patch', './src/index.js'],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/build',
		publicPath: '/',
		filename: '[name].[hash].js'
	},
	plugins: [new webpack.HotModuleReplacementPlugin()],
	devServer: {
		contentBase: './build',
		hot: true
	},
	plugins: [
		new HtmlWebpackPlugin({
			filename: 'index.html',
			template: 'src/index.html'
		})
	]
}
