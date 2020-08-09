import bbo from '../bbo';
describe('isIE', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  test('bbo.isIE is a Function', () => {
    expect(bbo.isIE).toBeInstanceOf(Function);
  });

  test('bbo.isIE() for ua', () => {
    expect(bbo.isIE()).toBe(false);
  });
});
