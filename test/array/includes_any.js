import bbo from '../bbo';

describe('includesAny', () => {
  it('base case', () => {
    expect(bbo.includesAny([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(bbo.includesAny([1, 7, 2, 5, 4], [5])).toBe(true);
    expect(bbo.includesAny([1, 7, 2, 5, 4], [5, 4])).toBe(true);
    expect(bbo.includesAny([], [])).toBe(false);
    expect(bbo.includesAny([1, 7, 2, 5, 4], [5, 4, 3])).toBe(true);
  });
});
