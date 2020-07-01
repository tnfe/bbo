import bbo from '../bbo';
// import assert from 'assert';

describe('byteLen', function() {
  it('in bytes by Unicode utf-8 utf8', function() {
    expect(bbo.byteLen('a')).toBe(1);
    expect(bbo.byteLen('a', 'utf8')).toBe(1);
    expect(bbo.byteLen('a', 'utf-8')).toBe(1);
  });

  it('in bytes by Unicode utf-16 utf16', function() {
    expect(bbo.byteLen('a', 'utf-16')).toBe(2);
    expect(bbo.byteLen('a', 'utf16')).toBe(2);
  });
});
