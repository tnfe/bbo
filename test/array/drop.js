import bbo from '../bbo';

describe('drop', () => {
  it('base case', () => {
    expect(bbo.drop([1, 2, 3])).toEqual([2, 3]);
    expect(bbo.drop([1, 2, 3], 2)).toEqual([3]);
    expect(bbo.drop([1, 2, 3], 42)).toEqual([]);
  });
});
