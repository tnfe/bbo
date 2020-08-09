import bbo from '../bbo';
import { ios } from '../const';
describe('isIOS', () => {
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"

  const isIOS = (ua) => {
    return /iPad|iPhone|iPod/.test(ua);
  };

  test('bbo.isIOS is a Function', () => {
    expect(bbo.isIOS).toBeInstanceOf(Function);
  });

  test('bbo.isIOS() for ua', () => {
    expect(bbo.isIOS()).toBe(false);
    expect(isIOS(ios)).toBe(true);
  });
});
