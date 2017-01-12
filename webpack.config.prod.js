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
    './src/index',
  ],
  debug: true,
  devServer: {
    contentBase: './src',
    stats: {
      colors: true
    },
    inline: true,
    progress: true,
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      },
    }),
    new ExtractTextPlugin("[name].css", {
      allChunks: true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ],
  postcss: function(webpack) {
    return [
      postcssImport({
        addDependencyTo: webpack
      }),
      postcssUrl(),
      autoprefixer({
        browsers: ['last 2 versions']
      })
    ];
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader?presets[]=es2015'
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader?-autoprefixer!postcss-loader"
        )
      },
      {
        test: /\.html$/,
        loader: 'raw!html-minify'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        exclude: /(node_modules)/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url",
        query: {
          limit: 100000,
          mimetype: "application/font-woff",
          name: 'public/fonts/[hash].[ext]'
        },
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url",
        query: {
          limit: 100000,
          mimetype: "application/font-woff",
          name: 'public/fonts/[hash].[ext]'
        },
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url",
        query: {
          limit: 100000,
          mimetype: "application/octet-stream",
          name: 'public/fonts/[hash].[ext]'
        },
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file",
        query: {
          name: 'public/fonts/[hash].[ext]'
        },
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url",
        query: {
          limit: 100000,
          mimetype: "image/svg+xml",
          name: 'public/fonts/[hash].[ext]'
        }
      }
    ]
  }
}