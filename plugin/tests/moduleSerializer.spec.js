// Add coverage
const findByExtension = require('../src/moduleSerializer').findByExtension;
const splitAssetsByExtension = require('../src/moduleSerializer').splitAssetsByExtension;

describe('moduleSerializer', () => {
  describe('Find by extension', () => {
    const mockArray = [
      {
        extension: 'js',
        value: 'javascript',
      },
      {
        extension: 'svg',
        value: 'vectors',
      },
    ];
    it('finds elements by given extension', () => {
      expect(findByExtension(mockArray, 'js').value).toEqual('javascript');
      expect(findByExtension(mockArray, 'svg').value).toEqual('vectors');
    });
    it('returns undefined when no result is found', () => {
      expect(findByExtension(mockArray, 'notexisting')).toEqual(undefined);
    });
  });

  describe('Split assets by extension', () => {
    const mockArray = [
      'test.js',
      'test2.js',
      'test3.css',
      'test4.css',
    ];

    const result = splitAssetsByExtension(mockArray);

    it('returns correct extension split length', () => {
      expect(Object.keys(result).length).toEqual(2);
    });

    it('returns correct number of properties with given type', () => {
      expect(result.js.length).toEqual(2);
      expect(result.css.length).toEqual(2);
    });
  });
});
