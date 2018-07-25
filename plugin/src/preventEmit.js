const PLUGIN_NAME = 'webpack-flat-bundle';

const sassPatern = /\.s?(c|a)ss?$/;
const jsPattern = /\.jsx?$/;
class PreventEmitPlugin {
  constructor(filePatterns) {
    this.filePatterns = filePatterns;
    this.cachedNames = [];
  }

  apply(compiler) {
    compiler.hooks.compilation.tap(PLUGIN_NAME, (compilation) => {
      compilation.hooks.chunkAsset.tap(PLUGIN_NAME, (chunk, fileName) => {
        if (
          chunk.entryModule.rawRequest &&
          sassPatern.test(chunk.entryModule.rawRequest) && 
          jsPattern.test(fileName)
        ) {
          this.addToCache(fileName);
        }
      });
      compilation.hooks.afterOptimizeAssets.tap(PLUGIN_NAME, () => {
        this.cachedNames.map((fileName) => {
          delete compilation.assets[fileName];
          delete compilation.assets[`${fileName}.map`];
          return compilation;
        });
      });
    });
  }

  addToCache(fileName) {
    this.cachedNames.push(fileName);
  }

  checkFilePatternMatch(fileRequest) {
    return Object
      .values(this.filePatterns)
      .find(pattern => pattern === fileRequest || false);
  }
}

module.exports = PreventEmitPlugin;
