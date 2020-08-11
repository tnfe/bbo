import bbo from '../bbo';

describe('fill0', () => {
  test('bbo.fill0() is a Function', () => {
    expect(bbo.fill0).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    const n = 3.1415926535897;

    expect(bbo.fill0(n)).toBe('03.1415926535897');
    expect(bbo.fill0(9)).toBe('09');
    expect(bbo.fill0(1)).toBe('01');
    expect(bbo.fill0(1)).toBe('01');
    expect(bbo.fill0(0.314)).toBe('00.314');
    expect(bbo.fill0(10)).toBe('10');
    expect(bbo.fill0(99)).toBe('99');
  });
});
