import bbo from '../bbo';

describe('numberFormat', () => {
  test('bbo.numberFormat() is a Function', () => {
    expect(bbo.numberFormat).toBeInstanceOf(Function);
  });

  test('should pass example', () => {
    //   example 1: bbo.numberFormat(1234.56)
    //   returns 1: '1,235'
    //   example 2: bbo.numberFormat(1234.56, 2, ',', ' ')
    //   returns 2: '1 234,56'
    //   example 3: bbo.numberFormat(1234.5678, 2, '.', '')
    //   returns 3: '1234.57'
    //   example 4: bbo.numberFormat(67, 2, ',', '.')
    //   returns 4: '67,00'
    //   example 5: bbo.numberFormat(1000)
    //   returns 5: '1,000'
    //   example 6: bbo.numberFormat(67.311, 2)
    //   returns 6: '67.31'
    //   example 7: bbo.numberFormat(1000.55, 1)
    //   returns 7: '1,000.6'
    //   example 8: bbo.numberFormat(67000, 5, ',', '.')
    //   returns 8: '67.000,00000'
    //   example 9: bbo.numberFormat(0.9, 0)
    //   returns 9: '1'
    //  example 10: bbo.numberFormat('1.20', 2)
    //  returns 10: '1.20'
    //  example 11: bbo.numberFormat('1.20', 4)
    //  returns 11: '1.2000'
    //  example 12: bbo.numberFormat('1.2000', 3)
    //  returns 12: '1.200'
    //  example 13: bbo.numberFormat('1 000,50', 2, '.', ' ')
    //  returns 13: '100 050.00'
    //  example 14: bbo.numberFormat(1e-8, 8, '.', '')
    //  returns 14: '0.00000001'

    expect(bbo.modulo(7, 5)).toBe(2);
    expect(bbo.numberFormat(1234.56)).toBe('1,235');
    expect(bbo.numberFormat(1234.56, 2, ',', ' ')).toBe('1 234,56');
    expect(bbo.numberFormat(1234.5678, 2, '.', '')).toBe('1234.57');
    expect(bbo.numberFormat(67, 2, ',', '.')).toBe('67,00');
    expect(bbo.numberFormat(1000)).toBe('1,000');
    expect(bbo.numberFormat(67.311, 2)).toBe('67.31');
    expect(bbo.numberFormat(1000.55, 1)).toBe('1,000.6');
    expect(bbo.numberFormat(67000, 5, ',', '.')).toBe('67.000,00000');
    expect(bbo.numberFormat(0.9, 0)).toBe('1');
    expect(bbo.numberFormat('1.20', 2)).toBe('1.20');
    expect(bbo.numberFormat('1.20', 4)).toBe('1.2000');
    expect(bbo.numberFormat('1.2000', 3)).toBe('1.200');
    expect(bbo.numberFormat('1 000,50', 2, '.', ' ')).toBe('100 050.00');
    expect(bbo.numberFormat(1e-8, 8, '.', '')).toBe('0.00000001');
  });
});
