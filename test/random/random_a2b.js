import bbo from '../bbo';

describe('randomA2B', () => {
  test('bbo.randomA2B() is a Function', () => {
    expect(bbo.randomA2B).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const max = 999;
    const min = 1;
    const number = bbo.randomA2B(min, max, true);
    expect(number < max).toBe(true);
    expect(number > max).toBe(false);
    expect(bbo.isNumber(number)).toBe(true);
    expect(bbo.isString(number)).toBe(false);

    const numberNoFloor = bbo.randomA2B(min, max);
    expect(bbo.isNumber(numberNoFloor)).toBe(true);
  });
});
