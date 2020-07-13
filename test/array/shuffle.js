import bbo from '../bbo';

describe('shuffle', () => {
  const arr = [2.3, 100, 75, 120];
  it('base case 1', () => {
    const result = bbo.shuffle(arr);
    const len = result.length;
    expect(len).toEqual(4);
  });

  it('base case 2', () => {
    const result = bbo.shuffle(arr);
    expect(bbo.includesAll(arr, result)).toBe(true);
  });
});
