const ExtractTextPlugin = require("extract-text-webpack-plugin");
const glob = require('glob');
const path = require('path');
const SassPlugin = require('sass-webpack-plugin');
const plugin = require('./preventEmit.js');

const entryPatterns = {
  js: './js/src/*.js',
  sass: './sass/*.scss',
};

const generateEntries = (entryPattern) => {
  let entryObject = {};
  entryPattern.map(pattern => {
    glob.sync(pattern).map(file => {
        entryObject[file.split('/').pop().split('.')[0]] = file;
  })})

  return entryObject;
}

const entries = generateEntries([entryPatterns.js, entryPatterns.sass]);

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
    new plugin(generateEntries([entryPatterns.sass])),
    new ExtractTextPlugin("css/[name].css"),
  ]
}
