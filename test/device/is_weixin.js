import bbo from '../bbo';
import { weixin, weishi, qqLiveBrowser, qq, qqNews, ipad, android, iphone } from '../const';
describe('isWeixin', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isWeixin = (ua) => {
    return /MicroMessenger/i.test(ua.toLowerCase());
  };

  test('bbo.isWeixin() is a Function', () => {
    expect(bbo.isWeixin).toBeInstanceOf(Function);
  });

  test('bbo.isWeixin() for ua', () => {
    expect(bbo.isWeixin()).toBe(false);
    expect(isWeixin(ipad)).toBe(false);
    expect(isWeixin(android)).toBe(false);
    expect(isWeixin(iphone)).toBe(false);
    expect(isWeixin(qqNews)).toBe(false);
    expect(isWeixin(qq)).toBe(false);
    expect(isWeixin(qqLiveBrowser)).toBe(false);
    expect(isWeixin(weishi)).toBe(false);
    expect(isWeixin(weixin)).toBe(true);
  });
});
