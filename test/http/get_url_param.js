import bbo from '../bbo';

describe('getUrlParam', () => {
  test('bbo.getUrlParam() is a Function', () => {
    expect(bbo.getUrlParam).toBeInstanceOf(Function);
  });

  test('set a simple key value', () => {
    const url = bbo.getUrlParam('a');
    // use URLSearchParams URL
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility
    // https://developer.mozilla.org/zh-CN/docs/Web/API/URL
    // const searchParams = new URLSearchParams(url);
    const parsedUrl = new URL(window.location.href); // defalut url = window.location.href
    expect(parsedUrl.searchParams.has('a')).toBe(false);
    expect(url).toBe(null);

    const urlset = 'https://ww.abc.com/c/a.htm?id=2f&y=1.21&a=b&foo=lorem&bar=&baz';
    expect(bbo.getUrlParam('a', urlset)).toBe('b');
    expect(bbo.getUrlParam('', urlset)).toBe(null);
    expect(bbo.getUrlParam('foo', urlset)).toBe('lorem');
    expect(bbo.getUrlParam('bar', urlset)).toBe(''); // "" (present with empty value)
    expect(bbo.getUrlParam('qux', urlset)).toBe(null); // "" null (absent)
    expect(bbo.getUrlParam('baz', urlset)).toBe(''); // "" (present with no value)
  });
});
