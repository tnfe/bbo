import bbo from '../bbo';
const url = './img.png';
describe('toDataUrl', () => {
  test('bbo.toDataUrl() is a Function', () => {
    expect(bbo.toDataUrl).toBeInstanceOf(Function);
  });

  test('should pass example 1', () => {
    bbo.toDataUrl(url, { enabledType: true }, (res) => {
      expect(res).toBe(true);
    });
  });
});
