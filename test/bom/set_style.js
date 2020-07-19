import bbo from '../bbo';

describe('setStyle', () => {
  test('return getComputedStyle', function() {
    const button = document.createElement('button');
    button.innerText = 'click me';
    button.setAttribute('class', 'className');
    button.style['display'] = 'none';
    document.body.appendChild(button);

    expect(getComputedStyle(button)['display']).toEqual('none');
    expect(bbo.getStyle(button, 'display')).toEqual('none');

    bbo.setStyle(button, 'display', 'block');
    expect(getComputedStyle(button)['display']).toEqual('block');
    expect(bbo.getStyle(button, 'display')).toEqual('block');
  });
});
