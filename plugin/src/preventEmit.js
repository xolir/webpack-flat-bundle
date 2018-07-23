class PreventEmitPlugin {
  constructor(filePatterns) {
    this.filePatterns = filePatterns;
    this.cachedNames = [];
  }

  apply(compiler) {
    compiler.plugin('compilation', (compilation) => {
      compilation.plugin('chunk-asset', (chunk, fileName) => {
        if (
          fileName.includes('.js') && chunk.entryModule.rawRequest && chunk.entryModule.rawRequest.includes('.scss')
        ) {
          this.addToCache(fileName);
        }
      });
      compilation.plugin('after-optimize-assets', () => {
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
    return Object.values(this.filePatterns).find(pattern => pattern === fileRequest || false);
  }
}

module.exports = PreventEmitPlugin;
