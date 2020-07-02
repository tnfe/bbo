import { PRINTABLE_ASCII } from '../const';
import bbo from '../bbo';

describe('endsWith', function() {
  it('should return true for valid ending string', function() {
    expect(bbo.endsWith('Hello World!', '!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'd!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'rld!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'orld!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', ' World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'o World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'lo World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'llo World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'ello World!')).toBe(true);
    expect(bbo.endsWith('Hello World!', 'Hello World!')).toBe(true);
    expect(bbo.endsWith('Привет Мир!', 'Мир!')).toBe(true);
    expect(bbo.endsWith('', '')).toBe(true);
    expect(bbo.endsWith(PRINTABLE_ASCII, '~')).toBe(true);
  });
});
