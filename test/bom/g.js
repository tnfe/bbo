import bbo from '../bbo';

describe('g', () => {
  test('return document.getElementById', function() {
    const button = document.createElement('button');
    button.innerText = 'click me';
    button.setAttribute('id', 'idName');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].innerText).toBe('click me');

    expect(buttons[0].id).toBe('idName');
    expect(bbo.g('idName')).toEqual(buttons[0]);
  });
});
