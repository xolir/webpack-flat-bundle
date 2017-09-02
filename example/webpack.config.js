const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const { globEntries, preventEmitPlugin } = require('webpack-flat-bundle');
const webpack = require('webpack');

const entryPatterns = {
  js: './js/src/**/*.js',
  sass: './sass/*.scss',
};

const entries = Object.assign(
  { vendor: ['react', 'angular']},
  globEntries(
    [entryPatterns.js],
    { relativeRoot: './js/src' }
  ),
  globEntries(
    [entryPatterns.sass],
    { relativeRoot: './sass/' }
  )
);

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
    ],
  },
  plugins: [
    new preventEmitPlugin(globEntries([entryPatterns.sass], { relativeRoot: './sass/' })),
    new ExtractTextPlugin("css/[name].css"),
    new webpack.optimize.CommonsChunkPlugin({ name: "vendor" })
  ]
}
