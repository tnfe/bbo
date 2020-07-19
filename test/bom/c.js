import bbo from '../bbo';

describe('c', () => {
  test('createElement & set attributes', function() {
    const button = bbo.c('button', 'className', 'click me', 'idName');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');

    expect(buttons[0].nodeName.toLowerCase()).toBe('button');
    expect(buttons[0].className).toBe('className');
    expect(buttons[0].textContent).toBe('click me');
    expect(buttons[0].id).toBe('idName');
  });
});
