import bbo from '../bbo';
describe('isAndroid', () => {
  // ua = navigator.userAgent , isMobile = bbo.isMobile
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  test('bbo.isAndroid is a Function', () => {
    expect(bbo.isAndroid).toBeInstanceOf(Function);
  });

  test('bbo.isAndroid() for ua', () => {
    expect(bbo.isAndroid()).toBe(false);
  });
});
