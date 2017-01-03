const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const EnvironmentPlugin = require('webpack').EnvironmentPlugin;

// create an output file to extract to via:
const cssExtract = new ExtractTextPlugin('main.css');

module.exports = {
  entry: './src/app.js',
  output: {
    path: '../map-project-server/public',
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new EnvironmentPlugin(['MAPBOX_TOKEN']),
    cssExtract
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
    },{
      test: /\.scss$/,
      loader: cssExtract.extract(
          'style-loader',
          'css-loader?sourceMap!sass-loader?sourceMap'
      )	
    },{
      test: /\.css$/,
      loader: cssExtract.extract(
          'style-loader',
          'css-loader'
      )	
    },
    {
      test: /\.html$/,
      loader: 'html'
    }]
  },
  sassLoader: {
    includePaths: ['./src/scss']
  }
};