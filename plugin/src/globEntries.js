const glob = require('glob');
const path = require('path');

const fileNameGenerator = (file, relativeRoot) =>
  path
    .resolve(file)
    .replace(`${path.resolve(relativeRoot)}`, '')
    .substr(1)
    .split('.')
    .shift();

const globEntries = (
  entryPattern,
  config = {
    relativeRoot: process.cwd(),
  },
) =>
  entryPattern.reduce((outputAccumulator, pattern) =>
      Object.assign(outputAccumulator, glob.sync(pattern).reduce((accumulator, file) =>
        Object.assign(accumulator, { [fileNameGenerator(file, config.relativeRoot)]: file })
      , {}))
    , {});

module.exports = globEntries;
module.exports.fileNameGenerator = fileNameGenerator;
