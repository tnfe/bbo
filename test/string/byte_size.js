import bbo from '../bbo';

describe('byteSize', function() {
  it('bytesize using special cases', function() {
    expect(bbo.byteSize('a')).toBe(1);
    expect(bbo.byteSize('')).toBe(0);
    expect(bbo.byteSize(1)).toBe(1);
    expect(bbo.byteSize(null)).toBe(4);
    expect(bbo.byteSize([])).toBe(0);
    expect(bbo.byteSize(undefined)).toBe(9);
  });
});
