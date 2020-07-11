import bbo from '../bbo';

describe('intersect', () => {
  it('base case', () => {
    expect(bbo.intersect([1, 2, 3], [4, 3, 2])).toEqual([2, 3]);
    expect(bbo.intersect([1, 2, 3], [])).toEqual([]);
    expect(bbo.intersect([], [4, 3, 2])).toEqual([]);
    expect(bbo.intersect([], [])).toEqual([]);
  });
});
