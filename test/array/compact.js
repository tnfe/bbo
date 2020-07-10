import bbo from '../bbo';

describe('compact', () => {
  it('base case', () => {
    expect(bbo.compact([0, 1, false, 2, '', 3], 3)).toEqual([1, 2, 3]);

    const array = [1, 2, 3, 4, 5];
    expect(bbo.compact([1, null, 2, undefined, null, NaN, 3, 4, false, 5], 3)).toEqual(array);

    expect(bbo.compact([1, 2, [], 4, {}])).toEqual([1, 2, [], 4, {}]);
    expect(bbo.compact([])).toEqual([]);
  });
});
