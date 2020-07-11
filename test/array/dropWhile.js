import bbo from '../bbo';

describe('dropWhile', () => {
  it('base case', () => {
    expect(bbo.dropWhile([1, 2, 3, 4], (n) => n >= 3)).toEqual([3, 4]);
  });
});
