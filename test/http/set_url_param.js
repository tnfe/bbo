import bbo from '../bbo';

describe('setUrlParam', () => {
  test('bbo.setUrlParam() is a Function', () => {
    expect(bbo.setUrlParam).toBeInstanceOf(Function);
  });

  test('set a simple key value', () => {
    const url = bbo.setUrlParam('a', 'b');
    // use URLSearchParams URL
    // https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams#Browser_compatibility
    // https://developer.mozilla.org/zh-CN/docs/Web/API/URL
    // const searchParams = new URLSearchParams(url);
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.has('a')).toBe(true);
    expect(parsedUrl.searchParams.has('b')).toBe(false);
    expect(parsedUrl.searchParams.get('a')).toBe('b');
  });

  test('set a key value and url', () => {
    const url = bbo.setUrlParam('a', 'b', 'https://ww.abc.com/c/a.htm?id=2f&y=1.21');
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.has('a')).toBe(true);
    expect(parsedUrl.searchParams.has('b')).toBe(false);
    expect(parsedUrl.searchParams.has('y')).toBe(true);
    expect(parsedUrl.searchParams.get('y')).toBe('1.21');
    expect(parsedUrl.searchParams.get('a')).toBe('b');
  });

  test('update key value', () => {
    const url = bbo.setUrlParam('a', 'c', 'https://ww.abc.com/c/a.htm?a=2f&y=1.21');
    const parsedUrl = new URL(url);
    expect(parsedUrl.searchParams.has('a')).toBe(true);
    expect(parsedUrl.searchParams.has('b')).toBe(false);
    expect(parsedUrl.searchParams.has('y')).toBe(true);
    expect(parsedUrl.searchParams.get('y')).toBe('1.21');
    expect(parsedUrl.searchParams.get('a')).toBe('c');
  });
});
