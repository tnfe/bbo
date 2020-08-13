import bbo from '../bbo';

describe('getType', () => {
  test('bbo.getType() is a Function', () => {
    expect(bbo.getType).toBeInstanceOf(Function);
  });

  test('bbo.getType()', () => {
    expect(bbo.getType(5)).toBe('number');
    expect(bbo.getType({})).toBe('object'); // -> 'object'
    expect(bbo.getType([])).toBe('array'); // -> 'array'
    expect(bbo.getType(new Set([1, 2, 3]))).toBe('set'); // -> 'set'
    expect(bbo.getType(null)).toBe('null'); // -> null
    expect(bbo.getType(undefined)).toBe('undefined'); // -> undefined
    expect(bbo.getType(function() {})).toBe('function'); // -> 'function'
    expect(bbo.getType(async function() {})).toBe('asyncfunction'); // -> 'AsyncFunction'
  });
});
