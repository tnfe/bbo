/* eslint-disable no-new-wrappers */
import bbo from '../bbo';

describe('values', () => {
  test('regular objects return array of property values', function() {
    expect(bbo.values({ a: 4, c: 8 })).toEqual([4, 8]);
    expect(bbo.values({ a: { aa: 2 }, b: { bb: 4 } })).toEqual([{ aa: 2 }, { bb: 4 }]);
    expect(bbo.values({})).toEqual([]);
  });

  test('array returns a copy of itself', function() {
    let arr1 = [1, 2, 3];
    let arr2 = [];

    expect(bbo.values(arr1)).toEqual(arr1);
    expect(bbo.values(arr2)).toEqual(arr2);
  });

  test('irregular objects return array of property values', function() {
    expect(
      bbo.values(function(a, b) {
        return a + b;
      })
    ).toEqual([]);

    expect(bbo.values(new String('hello'))).toEqual(['h', 'e', 'l', 'l', 'o']);

    let fn = function() {};
    fn.a = 4;
    expect(bbo.values(fn)).toEqual([4]);
  });

  test('primitives throw exceptions', function() {
    expect(() => {
      bbo.values(1);
    }).toThrow();

    expect(() => {
      bbo.values(true);
    }).toThrow();

    expect(() => {
      bbo.values(undefined);
    }).toThrow();

    expect(() => {
      bbo.values(null);
    }).toThrow();
  });
});
