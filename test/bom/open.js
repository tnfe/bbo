import bbo from '../bbo';

describe('hide', () => {
  test('open url', () => {
    const url = 'https://www.google.com/';
    bbo.open(url);
    const href = document.querySelectorAll('a');
    expect(url).toBe(href[0].href);
  });
});
