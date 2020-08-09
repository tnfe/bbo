import bbo from '../bbo';

describe('loadcss', () => {
  test('bbo.loadcss() is a Function', () => {
    expect(bbo.loadcss).toBeInstanceOf(Function);
  });

  test('bbo.loadcss()', () => {
    const button = bbo.c('button', 'button', 'click me', 'idName');
    document.body.appendChild(button);
    bbo.loadcss('./css.css', () => {
      expect(button.offsetWidth).toEqual('100px');
    });
  });
});
