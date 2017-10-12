const fileNameGenerator = require('../src/globEntries').fileNameGenerator;

describe('globEntries', () => {
  describe('fileNameGenerator', () => {
    const mockPaths = {
      simplePath: 'src/component.js',
      nestedPath: 'src/components/component.js',
      relativeRoot: 'src/',
    };
    it('should return correct correct component names', () => {
      expect(fileNameGenerator(mockPaths.simplePath, mockPaths.relativeRoot)).toEqual('component');
      expect(fileNameGenerator(mockPaths.nestedPath, mockPaths.relativeRoot)).toEqual('components/component');
    });
  });
});
