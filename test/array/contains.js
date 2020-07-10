import bbo from '../bbo';

describe('contains', () => {
  it('base case', () => {
    expect(bbo.contains([1, 2, 3], 1)).toBe(true);
  });
});
