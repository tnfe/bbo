import bbo from '../bbo';
import { qqLiveBrowser, qq, qqNews, ipad, android, iphone } from '../const';
describe('isTenvideo', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isTenvideo = (ua) => {
    return /qqlivebrowser/.test(ua.toLowerCase());
  };

  test('bbo.isTenvideo is a Function', () => {
    expect(bbo.isTenvideo).toBeInstanceOf(Function);
  });

  test('bbo.isTenvideo() for ua', () => {
    expect(bbo.isTenvideo()).toBe(false);
    expect(isTenvideo(ipad)).toBe(false);
    expect(isTenvideo(android)).toBe(false);
    expect(isTenvideo(iphone)).toBe(false);
    expect(isTenvideo(qqNews)).toBe(false);
    expect(isTenvideo(qq)).toBe(false);
    expect(isTenvideo(qqLiveBrowser)).toBe(true);
  });
});
