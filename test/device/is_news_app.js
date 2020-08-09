import bbo from '../bbo';
import { qqNews, ipad, android, iphone } from '../const';
describe('isNewsApp', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isNewsApp = (ua) => {
    return /qqnews/.test(ua); // 腾讯新闻app
  };

  test('bbo.isiPhone is a Function', () => {
    expect(bbo.isNewsApp).toBeInstanceOf(Function);
  });

  test('bbo.isNewsApp() for ua', () => {
    expect(bbo.isNewsApp()).toBe(false);
    expect(isNewsApp(ipad)).toBe(false);
    expect(isNewsApp(android)).toBe(false);
    expect(isNewsApp(iphone)).toBe(false);
    expect(isNewsApp(qqNews)).toBe(true);
  });
});
