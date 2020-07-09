import bbo from '../bbo';

describe('all', () => {
  it('base case', () => {
    expect(bbo.all([4, 2, 3], (x) => x > 1)).toBe(true);
    expect(bbo.all([4, 2, 3], (x) => x < 1)).toBe(false);
    expect(bbo.all([1, 2, 3])).toBe(true);
  });
});
