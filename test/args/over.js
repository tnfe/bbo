import bbo from '../bbo';

describe('over', () => {
  test('bbo.over is a Function', () => {
    expect(bbo.over).toBeInstanceOf(Function);
  });
  const minMax = bbo.over(Math.min, Math.max);
  test('Applies given functions over multiple arguments', () => {
    expect(minMax(1, 2, 3, 4, 5)).toEqual([1, 5]);
  });
});
