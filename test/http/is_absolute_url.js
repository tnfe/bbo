import bbo from '../bbo';

describe('isAbsoluteURL', () => {
  test('bbo.isAbsoluteURL() is a Function', () => {
    expect(bbo.isAbsoluteURL).toBeInstanceOf(Function);
  });

  test('an absolute URL', () => {
    expect(bbo.isAbsoluteURL('https://ww.com')).toBeTruthy();
  });
  test('an absolute URL', () => {
    expect(bbo.isAbsoluteURL('ftp://www.www.net')).toBeTruthy();
  });
  test('not a absolute URL', () => {
    expect(bbo.isAbsoluteURL('/foo/bar')).toBeFalsy();
  });
});
