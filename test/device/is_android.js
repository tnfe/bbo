import bbo from '../bbo';
import { android, chrome, edge } from '../const';

describe('isAndroid', () => {
  // ua = navigator.userAgent
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isAndroid = (ua) => {
    return ua.toLowerCase().indexOf('android') > -1;
  };

  test('bbo.isAndroid is a Function', () => {
    expect(bbo.isAndroid).toBeInstanceOf(Function);
  });

  test('bbo.isAndroid() for ua', () => {
    expect(bbo.isAndroid()).toBe(false);
    expect(isAndroid(android)).toBe(true);
    expect(isAndroid(chrome)).toBe(false);
    expect(isAndroid(edge)).toBe(false);
  });
});
