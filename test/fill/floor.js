import bbo from '../bbo';

describe('floor', () => {
  test('bbo.floor() is a Function', () => {
    expect(bbo.floor).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const n = 3.1415926535897;

    expect(bbo.floor(n)).toBe(3);
    expect(bbo.floor(n, 0)).toBe(3);
    expect(bbo.floor(n, 2)).toBe(3.14);
    expect(bbo.floor(n, 4)).toBe(3.1415);
    expect(bbo.floor(n, 5)).toBe(3.14159);
  });
});
