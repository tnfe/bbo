import bbo from '../bbo';

describe('getCookie', () => {
  test('simple value', function() {
    document.cookie = 'c=v';
    expect(bbo.getCookie('c')).toBe('v');
  });
  test('must encode ";"', function() {
    document.cookie = 'c%3B=foo';
    expect(bbo.getCookie('c;')).toBe('foo');
  });

  test('reading name with encoded equals sign', function() {
    document.cookie = 'c%3D=foo';
    expect(bbo.getCookie('c=')).toBe('foo');
  });

  test('setCookie', function() {
    bbo.setCookie('cv', 'cv');
    expect(bbo.getCookie('cv')).toBe('cv');
  });

  test('null', function() {
    expect(bbo.getCookie('cv2')).toBe(null);
    expect(bbo.getCookie()).toBe(null);
  });
});
