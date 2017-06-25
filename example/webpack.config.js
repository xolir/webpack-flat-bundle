const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const SassPlugin = require('sass-webpack-plugin');
const { globEntries, preventEmitPlugin } = require('webpack-flat-bundle');

const entryPatterns = {
  js: './js/src/*.js',
  sass: './sass/*.scss',
};

const entries = globEntries([entryPatterns.js, entryPatterns.sass]);

module.exports = {
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'js/[name].js'
  },
  module: {
    rules: [
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        use:
        [
          "css-loader",
            "sass-loader"
          ]
      })
    },
    {
      test: /\.js$/,
      use: 'babel-loader'
    }
    ],
  },
  plugins: [
    new preventEmitPlugin(globEntries([entryPatterns.sass])),
    new ExtractTextPlugin("css/[name].css"),
  ]
}
