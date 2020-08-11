import bbo from '../bbo';

describe('chainAsync', () => {
  test('bbo.chainAsync() is a Function', () => {
    expect(bbo.chainAsync).toBeInstanceOf(Function);
  });

  let incrementer = 0;
  test('Calls all functions in an array', () => {
    bbo.chainAsync([
      (next) => {
        incrementer += 1;
        next();
      },
      (next) => {
        incrementer += 1;
        next();
      },
      (next) => {
        expect(incrementer).toEqual(2);
      }
    ]);
  });

  test('Last function does not receive "next" argument', () => {
    bbo.chainAsync([
      (next) => {
        next();
      },
      (next) => {
        expect(next).toBe(undefined);
      }
    ]);
  });
});
