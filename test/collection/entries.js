import bbo from '../bbo';

describe('entries', () => {
  test('regular objects return pairs of property/value', function() {
    expect(bbo.entries({ c: 8, a: 4 })).toEqual([
      ['c', 8],
      ['a', 4]
    ]);

    expect(bbo.entries({ b: { bb: 4 }, a: { aa: 2 } })).toEqual([
      ['b', { bb: 4 }],
      ['a', { aa: 2 }]
    ]);

    expect(bbo.entries({})).toEqual([]);
  });

  test('arrays return pairs of index/value', function() {
    expect(bbo.entries([{ c: 8 }, { a: 4 }])).toEqual([
      ['0', { c: 8 }],
      ['1', { a: 4 }]
    ]);

    expect(bbo.entries([])).toEqual([]);
  });

  test('irregular objects return pairs of property/value', function() {
    expect(bbo.entries(new String('hello'))).toEqual([
      ['0', 'h'],
      ['1', 'e'],
      ['2', 'l'],
      ['3', 'l'],
      ['4', 'o']
    ]);

    expect(
      bbo.entries(function(a, b) {
        return a + b;
      })
    ).toEqual([]);

    const fn = function() {};
    fn.a = 4;
    expect(bbo.entries(fn)).toEqual([['a', 4]]);
  });
});
