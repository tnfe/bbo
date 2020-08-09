import bbo from '../bbo';
describe('isIphoneXmodel', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  test('bbo.isIphoneXmodel is a Function', () => {
    expect(bbo.isIphoneXmodel).toBeInstanceOf(Function);
  });

  test('bbo.isIphoneXmodel() for devicePixelRatio ,screen', () => {
    expect(bbo.isIphoneXmodel()).toBe(false);
  });
});
