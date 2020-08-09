import bbo from '../bbo';
import { chrome, edge, Edge12, Edge13, IE10, IE11, firefox, safari, ios, android } from '../const';

describe('isPC', () => {
  // ua = navigator.userAgent ,isPC = !isMobile = !bbo.isMobile
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"
  const isPC = (ua) => {
    return !/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
  };

  test('bbo.isPC is a Function', () => {
    expect(bbo.isPC).toBeInstanceOf(Function);
  });

  test('bbo.isPC() for ua', () => {
    expect(bbo.isPC(chrome)).toBe(true);
    expect(isPC(chrome)).toBe(true);
    expect(isPC(edge)).toBe(true);
    expect(isPC(Edge12)).toBe(true);
    expect(isPC(Edge13)).toBe(true);
    expect(isPC(IE10)).toBe(true);
    expect(isPC(IE11)).toBe(true);
    expect(isPC(firefox)).toBe(true);
    expect(isPC(safari)).toBe(true);

    expect(isPC(ios)).toBe(false);
    expect(isPC(android)).toBe(false);
  });
});
