import bbo from '../bbo';

describe('equal', () => {
  it('base case', () => {
    expect(bbo.equal([1], [1, 2])).toBe(false);
    expect(bbo.equal([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(bbo.equal([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(bbo.equal([], [])).toBe(true);
  });
});
