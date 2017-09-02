const glob = require('glob');
const path = require('path');

const fileNameGenerator = (file, relativeRoot) =>
  path
    .resolve(file)
    .replace(`${path.resolve(relativeRoot)}/`, '')
    .split('.')
    .shift();

module.exports = (
  entryPattern,
  config = {
    relativeRoot: false
  }
) =>
  entryPattern.reduce((outputAccumulator, pattern) =>
      Object.assign(outputAccumulator, glob.sync(pattern).reduce((accumulator, file) => {
        accumulator[fileNameGenerator(file, config.relativeRoot)] = file;
        return accumulator;
      }, {}))
    , {});
