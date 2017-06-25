const path = require('path');

const constants = {
  extractTextSignature: 'extract-text-webpack-plugin-output-filename'
}

const PreventEmitAssetPlugin = function (filePattern) {
  this.filePattern = filePattern;
}

const checkFilePatternMatch = (pattern, filePath) => (
  Object.values(pattern).find(filePattern => filePattern === filePath || false)
)

PreventEmitAssetPlugin.prototype.apply = function (compiler) {
  compiler.plugin('compilation', (compilation) => {
    compilation.plugin('chunk-asset', (chunk, filename) => {
      if (
        filename !== constants.extractTextSignature &&
        checkFilePatternMatch(this.filePattern, chunk.entryModule.rawRequest)
      ) {
        delete compilation.assets[filename]
      }
    });
  });
};

module.exports = PreventEmitAssetPlugin;
