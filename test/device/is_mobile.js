import bbo from '../bbo';
import { chrome, edge, Edge12, Edge13, IE10, IE11, firefox, safari, ios, android } from '../const';

describe('isMobile', () => {
  // ua = navigator.userAgent , isMobile = bbo.isMobile
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"
  const isMobile = (ua) => {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua.toLowerCase());
  };

  test('bbo.isMobile is a Function', () => {
    expect(bbo.isMobile).toBeInstanceOf(Function);
  });

  test('bbo.isMobile() for ua', () => {
    expect(bbo.isMobile(chrome)).toBe(false);
    expect(isMobile(chrome)).toBe(false);
    expect(isMobile(edge)).toBe(false);
    expect(isMobile(Edge12)).toBe(false);
    expect(isMobile(Edge13)).toBe(false);
    expect(isMobile(IE10)).toBe(false);
    expect(isMobile(IE11)).toBe(false);
    expect(isMobile(firefox)).toBe(false);
    expect(isMobile(safari)).toBe(false);

    expect(isMobile(ios)).toBe(true);
    expect(isMobile(android)).toBe(true);
  });
});
