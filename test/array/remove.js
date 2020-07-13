import bbo from '../bbo';

describe('remove', () => {
  it('base case', () => {
    const array = [1, 2, 3, 4, 5];
    expect(bbo.remove(array, [2, 4])).toEqual([1, 3, 5]);
    expect(bbo.remove(array, [])).toEqual(array);
  });
});
