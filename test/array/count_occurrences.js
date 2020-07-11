import bbo from '../bbo';

describe('countOccurrences', () => {
  it('base case', () => {
    expect(bbo.countOccurrences([1, 1, 2, 1, 2, 3], 1)).toBe(3);
    expect(bbo.countOccurrences([1, 1, 2, 1, 2, 3], 2)).toBe(2);
    expect(bbo.countOccurrences([1, 1, 2, 1, 2, 3], 3)).toBe(1);
  });
});
