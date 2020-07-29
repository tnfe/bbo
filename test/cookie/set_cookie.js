import bbo from '../bbo';

describe('setCookie', () => {
  test('set simple value', function() {
    bbo.setCookie('c', 'v');
    expect(document.cookie).toBe('c=v');
    bbo.setCookie('c1', 'v');
    expect(document.cookie).toBe('c=v; c1=v');
  });

  test('set option => path', function() {
    const cookie = 'c=v; c1=v';
    bbo.setCookie('c', 'v', { path: '/' });
    expect(document.cookie).toBe(cookie);
    bbo.setCookie('c', 'v', { path: '' });
    expect(document.cookie).toBe(cookie);
    bbo.setCookie('c', 'v', { path: '/cv' });
    expect(document.cookie).toBe(cookie);
  });
});
