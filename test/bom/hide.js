import bbo from '../bbo';

describe('hide', () => {
  test('hide hides an element', () => {
    let el = document.createElement('div');
    el.setAttribute('style', 'display: block;');
    bbo.hide(el);
    expect(el.style.display).toBe('none');
  });
});
