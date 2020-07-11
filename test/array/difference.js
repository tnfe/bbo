import bbo from '../bbo';

describe('difference', () => {
  it('base case', () => {
    expect(bbo.difference([], [])).toEqual([]);
    expect(bbo.difference([1, 2, 3], [4, 2, 6])).toEqual([1, 3]);
  });
});
