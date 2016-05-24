var webpack = require('webpack');
var path = require('path');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {presets:['react']},
      },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
    ],
  },

  entry: './src/react-pill-selector.js',

  output: {
    library: 'ReactPillSelector',
    libraryTarget: 'umd',
    path: 'dist',
    filename: 'react-pill-selector.js',
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    classnames: {
      root: 'classNames',
      commonjs: 'classnames',
      commonjs2: 'classnames',
      amd: 'classnames',
    },
  },

  node: {
    Buffer: false
  },

};
