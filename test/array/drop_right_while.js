import bbo from '../bbo';

describe('dropRightWhile', () => {
  it('base case', () => {
    expect(bbo.dropRightWhile([1, 2, 3, 4], (n) => n < 3)).toEqual([1, 2]);
  });
});
