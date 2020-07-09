import bbo from '../bbo';

describe('column', () => {
  it('base case', () => {
    expect(bbo.chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(bbo.chunk([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15], 4)).toEqual([
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
      [13, 14, 15]
    ]);
    expect(bbo.chunk([], 3)).toEqual([]);
    expect(bbo.chunk([1, 2, 3], 4)).toEqual([[1, 2, 3]]);
  });
});
