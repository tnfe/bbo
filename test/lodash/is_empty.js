import bbo from '../bbo';

describe('empty', function() {
  it('empty object, array, map or set', function() {
    expect(bbo.isEmpty({})).toBe(true);
    expect(bbo.isEmpty([])).toBe(true);
    expect(bbo.isEmpty(new Set())).toBe(true);
    expect(bbo.isEmpty(new Map())).toBe(true);
  });
});

describe('non-empty object', function() {
  it('non-empty object, array, map or set', function() {
    expect(bbo.isEmpty({ a: 3, b: 5 })).toBe(false);
    expect(bbo.isEmpty([1, 2])).toBe(false);
    expect(bbo.isEmpty(['a', 'b'])).toBe(false);
    expect(bbo.isEmpty(new Array(4))).toBe(false);
    expect(bbo.isEmpty(new Set([1, 2, 2]))).toBe(false);
    expect(bbo.isEmpty(new Map().set('a', 2))).toBe(false);
  });
});

describe('null undefined', function() {
  it('null or undefined', function() {
    expect(bbo.isEmpty(null)).toBe(true);
    expect(bbo.isEmpty(undefined)).toBe(true);
  });
});

describe('other', function() {
  it('other primitives', function() {
    expect(bbo.isEmpty(true)).toBe(true);
    expect(bbo.isEmpty(false)).toBe(true);
    expect(bbo.isEmpty('hello')).toBe(false);
    expect(bbo.isEmpty('')).toBe(true);
  });
});

describe('other object types', function() {
  it('other primitives', function() {
    expect(bbo.isEmpty(/^abc$/)).toBe(true);
    expect(bbo.isEmpty(0)).toBe(true);
    expect(bbo.isEmpty(35)).toBe(true);
    expect(bbo.isEmpty('abc')).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(bbo.isEmpty(new Boolean(true))).toBe(true);
  });
});
