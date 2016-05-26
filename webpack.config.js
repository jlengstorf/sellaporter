var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isDevMode = process.env.NODE_ENV === 'development';

module.exports = {

  debug: isDevMode,
  devtool: 'source-map',

  entry: {
    'main': [ 'babel-polyfill', __dirname + '/scripts/main.js' ],
    'vendors': [],
  },

  output: {
    path: __dirname + '/templates',
    filename: 'js/[name].min.js',
  },

  module: {

    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules|vendor/,
        loader: 'jscs-loader',
      }
    ],

    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss-loader'),
      },
    ],

  },

  plugins: [

    // Separates vendor scripts (which don't change often) for better caching.
    new webpack.optimize.CommonsChunkPlugin('vendors', 'js/vendors.min.js'),

    // Moves styles out of the main JS bundle and into their own file.
    new ExtractTextPlugin('css/[name].min.css', { allChunks: true }),
  ],

  postcss: function() {
    return [
      require('postcss-import')(),
      require('postcss-mixins'),
      require('postcss-nested'),
      require('postcss-simple-vars'),
      require('cssnext')(),
      require('cssnano')(),
    ];
  },

};
