import bbo from '../bbo';

describe('split', () => {
  const array = [1, 2, 3, 4, 5];

  it('base case 1', () => {
    expect(bbo.split(array, 2)).toEqual([[1, 2], [3, 4], [5]]);
    expect(bbo.split([], 3)).toEqual([]);
  });

  test('bbo.split !isArray throws an error', () => {
    expect(() => {
      bbo.split('', 1);
    }).toThrow();

    expect(() => {
      bbo.split([], 'a');
    }).toThrow();
  });
});
