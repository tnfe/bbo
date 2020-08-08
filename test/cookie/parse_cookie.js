import bbo from '../bbo';

describe('parseCookie', () => {
  test('bbo.parseCookie is a Function', () => {
    expect(bbo.parseCookie).toBeInstanceOf(Function);
  });

  test('parses the cookie', () => {
    expect(bbo.parseCookie('foo=bar; equation=E%3Dmc%5E2')).toEqual({
      foo: 'bar',
      equation: 'E=mc^2'
    });
  });
});
