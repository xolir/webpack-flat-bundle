const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const { globEntries, preventEmitPlugin } = require('../plugin/index');
const moduleSerializer = require('../plugin/src/moduleSerializer');
const webpack = require('webpack');

const entryPatterns = {
  js: './js/src/**/*.js',
  sass: './sass/*.scss',
};

const rootPaths = {
  js: './js/src'
};

const entries = Object.assign(
  { vendor: ['react', 'angular']},
  globEntries(
    [entryPatterns.js],
    { relativeRoot: rootPaths.js }
  ),
  globEntries(
    [entryPatterns.sass],
    { relativeRoot: './sass/' }
  )
);

module.exports = {
  entry: entries,
  devtool: 'sourcemap',
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
    ],
  },
  plugins: [
    new moduleSerializer([
      { extension: 'js', outputFile: './dist/js/js.txt'},
      { extension: 'css', outputFile: './dist/css/css.txt'}
    ]),
    new preventEmitPlugin(globEntries([entryPatterns.sass])),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor" }),
  ]
};
