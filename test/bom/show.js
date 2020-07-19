import bbo from '../bbo';

describe('show', () => {
  test('show shows an element', () => {
    let el = document.createElement('div');
    el.setAttribute('style', 'display: none;');
    bbo.show(el);
    expect(el.style.display).not.toBe('none');
  });
});
