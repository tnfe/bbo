import bbo from '../bbo';

describe('isTypeof', () => {
  test('bbo.isTypeof() is a Function', () => {
    expect(bbo.isTypeof).toBeInstanceOf(Function);
  });

  test('bbo.isTypeof()', () => {
    expect(bbo.isTypeof(5, 'number')).toBe(true);
    expect(bbo.isTypeof({}, 'object')).toBe(true); // -> 'object'
    expect(bbo.isTypeof([], 'array')).toBe(true); // -> 'array'
    expect(bbo.isTypeof(new Set([1, 2, 3]), 'set')).toBe(true); // -> 'set'
    expect(bbo.isTypeof(null, 'null')).toBe(true); // -> null
    expect(bbo.isTypeof(undefined, 'undefined')).toBe(true); // -> undefined
    expect(bbo.isTypeof(function() {}, 'function')).toBe(true); // -> 'function'
    expect(bbo.isTypeof(async function() {}, 'asyncfunction')).toBe(true); // -> 'AsyncFunction'
  });
});
