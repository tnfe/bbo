import bbo from '../bbo';

describe('dropRight', () => {
  it('base case', () => {
    expect(bbo.dropRight([1, 2, 3])).toEqual([1, 2]);
    expect(bbo.dropRight([1, 2, 3], 2)).toEqual([1]);
    expect(bbo.dropRight([1, 2, 3], 42)).toEqual([]);
  });
});
