import bbo from '../bbo';

describe('query', () => {
  test('query return document.querySelector', function() {
    const button = document.createElement('button');
    button.innerText = 'click me';
    button.setAttribute('class', 'className');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].innerText).toBe('click me');

    expect(buttons[0].className).toBe('className');
    expect(buttons[0]).toEqual(bbo.query('button'));
  });
});
