/* eslint-disable no-return-assign */
import bbo from '../bbo';

describe('trigger', () => {
  test('triggers an event', () => {
    let el = document.createElement('div');
    let val = false;
    const fn = () => (val = true);
    el.addEventListener('click', fn);
    bbo.trigger(el, 'click', 'MouseEvents');
    expect(val).toBeTruthy();
  });
});
