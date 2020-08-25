import bbo from '../bbo';

describe('clearTimesout', function() {
  test('clearTimesout is a Function', () => {
    expect(bbo.clearTimesout).toBeInstanceOf(Function);
  });

  test('base example', () => {
    let i = 0;
    const less = 6;
    let interval = setInterval(function() {
      console.log(i++);
      if (i > less) {
        bbo.clearTimesout(interval);
        expect(i).toBeLessThan(less);
      }
    }, 1);

    expect(bbo.clearTimesout(interval)).toEqual(window.clearInterval(interval));
  });
});
