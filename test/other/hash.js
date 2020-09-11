import bbo from '../bbo';

describe('hash', () => {
  test('bbo.hash() is a Function', () => {
    expect(bbo.hash).toBeInstanceOf(Function);
  });

  test('bbo.hash()', () => {
    expect(bbo.hash('')).toBe(0);
    expect(bbo.hash(1)).toBe(49);
    expect(bbo.hash(1000)).toBe(1507423);
    expect(bbo.hash('sdf%$sdfMnjjskds23')).toBe(-844608950);
  });
});
