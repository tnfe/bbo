import bbo from '../bbo';

describe('intersectBy', () => {
  it('base case', () => {
    expect(bbo.intersectBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([2.1]);
  });
});
