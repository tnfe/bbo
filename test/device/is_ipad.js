import bbo from '../bbo';
import { ios, ipad, android } from '../const';
describe('isIPad', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isIPad = (ua) => {
    return /iPad/.test(ua);
  };

  test('bbo.isIPad is a Function', () => {
    expect(bbo.isIPad).toBeInstanceOf(Function);
  });

  test('bbo.isIPad() for ua', () => {
    expect(bbo.isIPad()).toBe(false);
    expect(isIPad(ios)).toBe(false);
    expect(isIPad(android)).toBe(false);
    expect(isIPad(ipad)).toBe(true);
  });
});
