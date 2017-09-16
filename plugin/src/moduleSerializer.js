const path = require('path');
const fs = require('fs');

const splitAssetsByExtension = (assets) => (
  assets.reduce((accumulator, asset) => {
    const fileExtension = asset.split('.').pop();
    accumulator[fileExtension] ? accumulator[fileExtension].push(asset) : accumulator[fileExtension] = [asset];

    return accumulator;
  }, {})
);

const findByExtension = (array, value) => (
  array.find(element => element.extension === value)
);

class moduleSerializer {
  constructor(fileMap) {
    this.fileMap = fileMap;
  }

  apply(compiler) {
    compiler.plugin('emit', (compilation, callback) => {
      const assetsMap = splitAssetsByExtension(Object.keys(compilation.assets));

      Object.keys(assetsMap).map(assetKey => {
        const fileName = findByExtension(this.fileMap, assetKey).outputFile;
        const outputNames = assetsMap[assetKey];

        fs.readFile(path.resolve(fileName), 'utf8', (error, file) => {
          const output = outputNames
            .filter(fileName => !file.split('\n').includes(fileName))
            .reduce((accumulator, file) => accumulator.concat(`\n${file}`), '');

          fs.writeFile(path.resolve(fileName), file.concat(output));
        })
      });

      callback()
    });
  }
}

module.exports = moduleSerializer;
