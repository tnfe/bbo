import bbo from '../bbo';
import { ios, ipad, android, iphone } from '../const';
describe('isiPhone', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isiPhone = (ua) => {
    return /iPhone/.test(ua);
  };

  test('bbo.isiPhone is a Function', () => {
    expect(bbo.isiPhone).toBeInstanceOf(Function);
  });

  test('bbo.isiPhone() for ua', () => {
    expect(bbo.isiPhone()).toBe(false);
    expect(isiPhone(ipad)).toBe(false);
    expect(isiPhone(android)).toBe(false);
    expect(isiPhone(iphone)).toBe(true);
    expect(isiPhone(ios)).toBe(true);
  });
});
