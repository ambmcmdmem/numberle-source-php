import Numberle from '../src/server/module/Numberle';

describe('Numberle', () => {
  const toBeTested = new Numberle(1);
  describe('getAnswer', () => {
    test('再現性のある回答が得られているか', () => {
      expect(toBeTested.getAnswer()).toStrictEqual(toBeTested.getAnswer());
    });
  });
});
