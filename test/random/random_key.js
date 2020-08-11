import bbo from '../bbo';

describe('randomKey', () => {
  test('bbo.randomKey() is a Function', () => {
    expect(bbo.randomKey).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const size = bbo.randomA2B(1, 32, true);
    expect(bbo.randomKey(size).length).toBe(size);
    expect(bbo.isString(bbo.randomKey(size))).toBe(true);
  });
});
