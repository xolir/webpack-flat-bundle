const glob = require('glob');
const path = require('path');

// Convert it to .reduce pattern
const fileNameSplitter = file => file.split('/').pop().split('.')[0]

module.exports = (entryPattern) =>
  entryPattern.reduce((outputAccumulator, pattern) => {
    return Object.assign(outputAccumulator, glob.sync(pattern).reduce((accumulator, file) => {
        accumulator[fileNameSplitter(file)] = file;
        return accumulator;
    }, {}))
  }, {})
