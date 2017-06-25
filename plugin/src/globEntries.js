const glob = require('glob');
const path = require('path');

// Convert it to .reduce pattern
module.exports = (entryPattern) => {
  let entryObject = {};
  entryPattern.map(pattern => {
    glob.sync(pattern).map(file => {
        entryObject[file.split('/').pop().split('.')[0]] = file;
  })})

  return entryObject;
}
