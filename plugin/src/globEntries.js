const glob = require('glob');
const path = require('path');

module.exports = (entryPattern) => {
  let entryObject = {};
  entryPattern.map(pattern => {
    glob.sync(pattern).map(file => {
        entryObject[file.split('/').pop().split('.')[0]] = file;
  })})

  return entryObject;
}
