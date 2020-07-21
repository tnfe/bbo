import bbo from '../bbo';

describe('isEmpty', function() {
  it('empty object, array, map or set', function() {
    expect(bbo.isEmpty({})).toBe(true);
    expect(bbo.isEmpty([])).toBe(true);
    expect(typeof Set === 'function' ? bbo.isEmpty(new Set()) : true).toBe(true);
    expect(typeof Map === 'function' ? bbo.isEmpty(new Map()) : true).toBe(true);
  });

  it('non-empty object, array, map or set', function() {
    expect(bbo.isEmpty({ a: 3, b: 5 })).toBe(false);
    expect(bbo.isEmpty([1, 2])).toBe(false);
    expect(bbo.isEmpty(['a', 'b'])).toBe(false);
    expect(bbo.isEmpty(new Array(4))).toBe(false);
    expect(
      bbo.isEmpty(typeof Set === 'function' ? bbo.isEmpty(new Set([1, 2, 2])) : true)
    ).not.toBe(false);

    expect(
      bbo.isEmpty(typeof Map === 'function' ? bbo.isEmpty(new Map().set('a', 2)) : true)
    ).not.toBe(false);
  });

  it('null or undefined', function() {
    expect(bbo.isEmpty(null)).toBe(true);
    expect(bbo.isEmpty(undefined)).toBe(true);
  });

  it('other primitives', function() {
    expect(bbo.isEmpty(true)).toBe(true);
    expect(bbo.isEmpty(false)).toBe(true);
    expect(bbo.isEmpty('hello')).toBe(false);
    expect(bbo.isEmpty('')).toBe(true);
  });

  it('other primitives', function() {
    expect(bbo.isEmpty(/^abc$/)).toBe(true);
    expect(bbo.isEmpty(0)).toBe(true);
    expect(bbo.isEmpty(35)).toBe(true);
    expect(bbo.isEmpty('abc')).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(bbo.isEmpty(new Boolean(true))).toBe(true);

    const m = new Map([
      [1, 'a'],
      [2, 'b']
    ]);
    expect(bbo.isEmpty(m)).toBe(true);

    const set = new Set([1, 2, 3, 4, 5, 6, 5]);
    expect(bbo.isEmpty(set)).toBe(true);

    expect(bbo.isEmpty(undefined)).toBe(true);
  });
});
