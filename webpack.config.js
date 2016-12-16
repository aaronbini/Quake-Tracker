const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './src/app.js',
  output: {
    path: './build',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new ExtractTextPlugin('/styles/bundle.css')
  ],
  module: {
    preLoaders: [{
      test: /\.js$/,
      loader: 'eslint-loader',
      exclude: /node_modules/
    }],
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        // presets: ['es2015'],
        cacheDirectory: true
      }
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract('style!',
      'css?sourceMap!sass?sourceMap')
    },
    {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style!',
      'css')
    },
    {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss/includes']
  }
};