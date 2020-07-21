import bbo from '../bbo';

describe('any', () => {
  it('base case', () => {
    expect(bbo.any([4, 2, 3], (x) => x > 1)).toBe(true);
    expect(bbo.any([4, 2, 3], (x) => x < 1)).toBe(false);
    expect(bbo.any([1, 2, 3])).toBe(true);
  });
});
