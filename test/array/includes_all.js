import bbo from '../bbo';

describe('includesAll', () => {
  it('base case', () => {
    expect(bbo.includesAll([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(bbo.includesAll([1, 7, 2, 5, 4], [5])).toBe(true);
    expect(bbo.includesAll([1, 7, 2, 5, 4], [5, 4])).toBe(true);
    expect(bbo.includesAll([], [])).toBe(true);
    expect(bbo.includesAll([1, 7, 2, 5, 4], [5, 4, 3])).toBe(false);
  });
});
