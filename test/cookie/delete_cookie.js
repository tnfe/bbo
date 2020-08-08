import bbo from '../bbo';

describe('deleteCookie', () => {
  const cookie = 'c=v';

  test('bbo.deleteCookie or delCookie is a Function', () => {
    expect(bbo.deleteCookie).toBeInstanceOf(Function);
    expect(bbo.delCookie).toBeInstanceOf(Function);
  });

  test('delete simple value', function() {
    bbo.setCookie('c', 'v');
    expect(document.cookie).toBe(cookie);

    bbo.deleteCookie('c');
    expect(document.cookie).toBe('');
  });
});
