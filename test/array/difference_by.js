import bbo from '../bbo';

describe('differenceBy', () => {
  it('base case', () => {
    expect(bbo.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor)).toEqual([1]);
    expect(bbo.differenceBy([{ x: 2 }, { x: 1 }], [{ x: 1 }], (v) => v.x)).toEqual([2]);
  });
});
