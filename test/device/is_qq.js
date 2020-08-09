import bbo from '../bbo';
import { qq, qqNews, ipad, android, iphone } from '../const';
describe('isQQ', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isQQ = (ua) => {
    return /qq\//.test(ua.toLowerCase());
  };

  test('bbo.isQQ is a Function', () => {
    expect(bbo.isQQ).toBeInstanceOf(Function);
  });

  test('bbo.isQQ() for ua', () => {
    expect(bbo.isQQ()).toBe(false);
    expect(isQQ(ipad)).toBe(false);
    expect(isQQ(android)).toBe(false);
    expect(isQQ(iphone)).toBe(false);
    expect(isQQ(qqNews)).toBe(false);
    expect(isQQ(qq)).toBe(true);
  });
});
