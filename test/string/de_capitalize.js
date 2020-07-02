import { PRINTABLE_ASCII } from '../const';
import bbo from '../bbo';

describe('deCapitalize', function() {
  it('should decapitalize the first character in a string', function() {
    expect(bbo.deCapitalize('Light')).toBe('light');
    expect(bbo.deCapitalize('light')).toBe('light');
    expect(bbo.deCapitalize('Sun')).toBe('sun');
    expect(bbo.deCapitalize('f')).toBe('f');
    expect(bbo.deCapitalize('')).toBe('');
    expect(bbo.deCapitalize('*light')).toBe('*light');
    expect(bbo.deCapitalize(PRINTABLE_ASCII)).toBe(PRINTABLE_ASCII);
  });

  it('should decapitalize the first character in a string representation of an object', function() {
    expect(bbo.deCapitalize(['Fruit'])).toBe('fruit');
    expect(
      bbo.deCapitalize(
        {
          toString: function() {
            return 'CaRrOt';
          }
        },
        false
      )
    ).toBe('caRrOt');
  });

  it('should not modify numbers', function() {
    expect(bbo.deCapitalize(100)).toBe('100');
    expect(bbo.deCapitalize(812, false)).toBe('812');
  });

  it('should return an empty string for null or undefined', function() {
    expect(bbo.deCapitalize()).toBe('');
    expect(bbo.deCapitalize(undefined)).toBe('');
    expect(bbo.deCapitalize(null)).toBe('');
  });
});
