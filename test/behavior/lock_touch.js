import bbo from '../bbo';

describe('lockTouch', () => {
  it('should pass example 1', () => {
    const button = document.createElement('button');
    button.innerText = 'click me';
    document.body.appendChild(button);
    const buttons = document.querySelectorAll('button');

    expect(buttons).toHaveLength(1); // true
    expect(buttons[0].innerText).toBe('click me'); // true

    buttons[0].addEventListener('touchmove', (e) => {
      e.target.innerText = 'touchmoved';
    });

    buttons[0].addEventListener('touchstart', (e) => {
      e.target.innerText = 'touchstartd';
    });
    expect(buttons[0].innerText).not.toBe('touchmoved'); // true

    const touchmove = new Event('touchmove');
    buttons[0].dispatchEvent(touchmove);
    expect(buttons[0].innerText).toBe('touchmoved'); // true

    bbo.lockTouch();

    const touchstart = new Event('touchstart');
    buttons[0].dispatchEvent(touchstart);

    expect(buttons[0].innerText).toBe('touchstartd'); // true
  });
});
