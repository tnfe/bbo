import bbo from '../bbo';
import { chrome, edge, Edge12, Edge13, IE10, IE11 } from '../const';

describe('ieVersion', () => {
  // ua = navigator.userAgent , isMobile = bbo.isMobile
  // jest jsdom ua = "Mozilla/5.0 (darwin) AppleWebKit/537.36 (KHTML, like Gecko) jsdom/11.12.0"
  const ieVersion = (ua) => {
    let uakit = ua;
    let msie = uakit.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(uakit.substring(msie + 5, uakit.indexOf('.', msie)), 10);
    }

    let trident = uakit.indexOf('Trident/');
    if (trident > 0) {
      let rv = uakit.indexOf('rv:');
      return parseInt(uakit.substring(rv + 3, uakit.indexOf('.', rv)), 10);
    }

    let edge = uakit.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, uakit.indexOf('.', edge)), 10);
    }

    return '';
  };

  test('bbo.ieVersion is a Function', () => {
    expect(bbo.ieVersion).toBeInstanceOf(Function);
  });

  test('bbo.ieVersion() for ua', () => {
    expect(bbo.ieVersion()).toBe('');
    expect(ieVersion(chrome)).toBe('');
    expect(ieVersion(edge)).toBe(12);
    expect(ieVersion(Edge12)).toBe(12);
    expect(ieVersion(Edge13)).toBe(13);
    expect(ieVersion(IE10)).toBe(10);
    expect(ieVersion(IE11)).toBe(11);
  });
});
