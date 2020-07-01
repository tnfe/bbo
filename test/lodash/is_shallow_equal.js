import bbo from '../bbo';

describe('isShallowEqual', () => {
  it('should compare "strings"', () => {
    expect(bbo.isShallowEqual('a', 'a')).toBe(true);
    expect(bbo.isShallowEqual('a', 'b')).toBe(false);
  });

  it('should compare "numbers"', () => {
    expect(bbo.isShallowEqual(1, 1)).toBe(true);
    expect(bbo.isShallowEqual(1, 2)).toBe(false);
  });

  it('should compare "booleans"', () => {
    expect(bbo.isShallowEqual(true, true)).toBe(true);
    expect(bbo.isShallowEqual(true, false)).toBe(false);
  });

  it('should compare "arrays"', () => {
    expect(bbo.isShallowEqual([], [])).toBe(true);
    expect(bbo.isShallowEqual([1], [1])).toBe(true);
    expect(bbo.isShallowEqual([1, 2], [1, 2])).toBe(true);
    expect(bbo.isShallowEqual([1, [1]], [1, [1]])).toBe(true);
    expect(bbo.isShallowEqual([{ a: 1 }, { a: 1 }], [{ a: 1 }, { a: 1 }])).toBe(true);

    expect(
      bbo.isShallowEqual(
        [
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } }
        ],
        [
          { a: 1, b: { c: 2 } },
          { a: 1, b: { c: 2 } }
        ]
      )
    ).toBe(true);
    expect(bbo.isShallowEqual([{ a: [1] }, { a: [1] }], [{ a: [1] }, { a: [1] }])).toBe(true);
  });

  it('should compare "objects"', () => {
    expect(bbo.isShallowEqual({}, {})).toBe(true);
    expect(bbo.isShallowEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(bbo.isShallowEqual({ a: [1] }, { a: [1] })).toBe(true);
    expect(bbo.isShallowEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);

    expect(
      bbo.isShallowEqual(
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } },
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } }
      )
    ).toBe(true);
    expect(bbo.isShallowEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(bbo.isShallowEqual({ a: [1] }, { a: [2] })).toBe(false);
    expect(bbo.isShallowEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
    expect(
      bbo.isShallowEqual(
        { a: { b: [1, 2, { c: 1, d: { e: 1 } }] } },
        { a: { b: [1, 2, { c: 1, d: { e: 2 } }] } }
      )
    ).toBe(false);
  });

  it('should compare "null"', () => {
    expect(bbo.isShallowEqual(null, null)).toBe(true);
    expect(bbo.isShallowEqual(null, false)).toBe(false);
  });

  it('should compare "undefined"', () => {
    expect(bbo.isShallowEqual(undefined, undefined)).toBe(true);
    expect(bbo.isShallowEqual(undefined, false)).toBe(false);
  });

  it('should compare "dates"', () => {
    let date = new Date();
    expect(bbo.isShallowEqual(date, date)).toBe(true);
  });

  it('should NOT compare "functions"', () => {
    expect(
      bbo.isShallowEqual(
        () => {},
        () => {}
      )
    ).toBe(true);
  });

  it('should compare multiple (> 2) values', () => {
    expect(bbo.isShallowEqual('a', 'a', 'a')).toBe(true);
    expect(bbo.isShallowEqual({ a: 1 }, { a: 1 }, { a: 1 })).toBe(true);
    expect(bbo.isShallowEqual([1, 2], [1, 2], [1, 2], [1, 2])).toBe(true);
    expect(bbo.isShallowEqual('a', 'a', 'b')).toBe(false);
    expect(bbo.isShallowEqual({ a: 1 }, { a: 2 }, { a: 1 })).toBe(false);
    expect(bbo.isShallowEqual([1, 2], [1, 2, 3], [1, 2], [1, 2])).toBe(false);
  });

  it('should return "false" given a single param', () => {
    expect(bbo.isShallowEqual('a')).toBe(false);
  });

  it('should return "false" given no params', () => {
    expect(bbo.isShallowEqual()).toBe(false);
  });
});
