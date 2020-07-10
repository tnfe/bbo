import bbo from '../bbo';

describe('copyArray', () => {
  it('base case', () => {
    expect(bbo.copyArray([])).toEqual([]);
    expect(bbo.copyArray([1, 2, 3])).toEqual([1, 2, 3]);

    // eslint-disable-next-line no-array-constructor
    const array = new Array();
    expect(bbo.copyArray(array)).toEqual(array);
  });
});
