import bbo from '../bbo';

describe('attr', () => {
  test('set attributes', function() {
    const button = document.createElement('button');
    button.innerText = 'click me';
    bbo.attr(button, 'sid', 'btn');
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');
    expect(buttons[0].innerText).toBe('click me'); // true

    let output = {};
    const attrs = buttons[0].attributes;
    if (buttons[0].hasAttributes()) {
      for (let i = attrs.length - 1; i >= 0; i--) {
        const name = attrs[i].name;
        output[name] = attrs[i].value;
      }
      expect(output['sid']).toBe('btn'); // true
    }
  });
});
