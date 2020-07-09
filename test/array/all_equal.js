import bbo from '../bbo';

describe('allEqual', () => {
  it('base case', () => {
    expect(bbo.allEqual(['a', 'a', 'a', 'a'])).toBe(true);
    expect(bbo.allEqual(['a', 'a', 'b', 'a'])).toBe(false);
  });

  it('base case2', () => {
    expect(bbo.allEqual(['false', ''])).toBe(false);
    expect(bbo.allEqual(['false', 'false'])).toBe(true);
    expect(bbo.allEqual(['false', false])).toBe(false);
    expect(bbo.allEqual([NaN, NaN])).toBe(false);
  });

  // it('special case', () => {
  //   expect(bbo.allEqual(null)).toBe(false);
  //   expect(bbo.allEqual([])).toBe(true);
  //   expect(bbo.allEqual({})).toBe(false);
  //   expect(bbo.allEqual([1])).toBe(false);
  //   expect(bbo.allEqual([1, 2])).toBe(false);
  //   expect(bbo.allEqual(NaN)).toBe(false);
  // });
});
