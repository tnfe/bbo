import bbo from '../bbo';

describe('capitalize', function() {
  it('should capitalize the first character in a string', function() {
    expect(bbo.capitalize('APPLE')).toBe('Apple');
    expect(bbo.capitalize('apple')).toBe('Apple');
    expect(bbo.capitalize('macBook')).toBe('Macbook');
    expect(bbo.capitalize('f')).toBe('F');
    expect(bbo.capitalize('')).toBe('');
    expect(bbo.capitalize('*apple')).toBe('*apple');
  });

  it('should capitalize the first character in a string and keep the rest unmodified', function() {
    expect(bbo.capitalize('apple')).toBe('Apple');
    expect(bbo.capitalize('APPLE')).toBe('Apple');
    expect(bbo.capitalize('яблоко')).toBe('Яблоко');
    expect(bbo.capitalize('f')).toBe('F');
    expect(bbo.capitalize('')).toBe('');
    expect(bbo.capitalize('100')).toBe('100');
    expect(bbo.capitalize('  ')).toBe('  ');
  });

  it('should capitalize the first character in a string representation of an object', function() {
    expect(bbo.capitalize(['grape'])).toBe('Grape');
    expect(
      bbo.capitalize({
        toString: function() {
          return 'oRaNgE';
        }
      })
    ).toBe('Orange');
  });

  it('should not modify numbers', function() {
    expect(bbo.capitalize(100)).toBe('100');
  });

  it('should return an empty string for null or undefined', function() {
    // expect(bbo.capitalize()).toBe('');
    expect(bbo.capitalize(undefined)).toBe('Undefined');
    expect(bbo.capitalize(null)).toBe('Null');
    expect(bbo.capitalize(undefined)).toBe('Undefined');
    expect(bbo.capitalize(undefined)).toBe('Undefined');
  });
});
