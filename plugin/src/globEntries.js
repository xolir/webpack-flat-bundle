const glob = require('glob');

const fileNameSplitter = (file, nestingLevel) => file
  .split('/')
  .slice(-nestingLevel)
  .join('/')
  .split('.')
  .shift();


module.exports = (entryPattern, config = { nestingLevel: 1 }) =>
  entryPattern.reduce((outputAccumulator, pattern) =>
      Object.assign(outputAccumulator, glob.sync(pattern).reduce((accumulator, file) => {
        accumulator[fileNameSplitter(file, config.nestingLevel)] = file;
        return accumulator;
      }, {}))
    , {});
