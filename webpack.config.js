var ExtractTextPlugin = require('extract-text-webpack-plugin');
var isDevMode = process.env.NODE_ENV === 'development';

module.exports = {

  debug: isDevMode,
  devtool: 'source-map',

  entry: {
    'main': __dirname + '/scripts/main.js',
  },

  output: {
    path: __dirname + '/templates',
    filename: 'js/[name].min.js',
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css!postcss-loader'),
      },
    ],
  },

  plugins: [

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
