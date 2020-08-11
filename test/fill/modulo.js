import bbo from '../bbo';

describe('modulo', () => {
  test('bbo.modulo() is a Function', () => {
    expect(bbo.modulo).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    // bbo.modulo(7, 5); // 2
    // bbo.modulo(17, 23); // 17
    // bbo.modulo(16.2, 3.8); // 1
    // bbo.modulo(5.8, 3.4); //2.4
    // bbo.modulo(4, 0); // 4
    // bbo.modulo(-7, 5); // 3
    // bbo.modulo(-2, 15); // 13
    // bbo.modulo(-5.8, 3.4); // 1
    // bbo.modulo(12, -1); // NaN
    // bbo.modulo(-3, -8); // NaN
    // bbo.modulo(12, 'apple'); // NaN
    // bbo.modulo('bee', 9); // NaN
    // bbo.modulo(null, undefined); // NaN

    expect(bbo.modulo(7, 5)).toBe(2);
    expect(bbo.modulo(17, 23)).toBe(17);
    expect(bbo.modulo(16.2, 3.8)).toBe(1);
    expect(bbo.modulo(5.8, 3.4)).toBe(2.4);
    expect(bbo.modulo(4, 0)).toBe(4);
    expect(bbo.modulo(-7, 5)).toBe(3);
    expect(bbo.modulo(-2, 15)).toBe(13);
    expect(bbo.modulo(-5.8, 3.4)).toBe(1);
    expect(bbo.modulo(12, -1)).toBe(NaN);
    expect(bbo.modulo(-3, -8)).toBe(NaN);
    expect(bbo.modulo(12, 'apple')).toBe(NaN);
    expect(bbo.modulo('bee', 9)).toBe(NaN);
    expect(bbo.modulo(null, undefined)).toBe(NaN);
  });
});
