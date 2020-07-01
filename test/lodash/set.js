/* eslint-disable no-undef */
import bbo from '../bbo';

describe('set', function() {
  test('sets existing property using dot-notation arg', function() {
    let obj1 = { a: { aa: { aaa: 2 } } };
    expect(bbo.set(obj1, 'a.aa.aaa', 3)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 3 } } });

    let obj2 = { a: { aa: { aaa: 2 } } };

    expect(bbo.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets existing property using array arg', function() {
    let obj1 = { a: { aa: { aaa: 2 } } };
    expect(bbo.set(obj1, ['a', 'aa', 'aaa'], 3)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 3 } } });

    let obj2 = { a: { aa: { aaa: 2 } } };
    expect(bbo.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets non-existent property using dot-notation arg', function() {
    let obj1 = {};
    expect(bbo.set(obj1, 'a.aa.aaa', 4)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 4 } } });

    let obj2 = {};
    expect(bbo.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test('sets non-existent property using array arg', function() {
    let obj1 = {};
    expect(bbo.set(obj1, ['a', 'aa', 'aaa'], 4)).toEqual(true);
    expect(obj1).toStrictEqual({ a: { aa: { aaa: 4 } } });

    let obj2 = {};
    expect(bbo.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
    expect(obj2).toStrictEqual({ a: { aa: { bbb: 7 } } });
  });

  test("doesn't interrupt property chain, using dot-notation arg", function() {
    let obj1 = { a: 5 };
    expect(bbo.set(obj1, 'a.aa.aaa', 4)).toEqual(false);
    // ok to clobber last property
    let obj2 = { a: { aa: 9 } };
    expect(bbo.set(obj2, 'a.aa', { bbb: 7 })).toEqual(true);
  });

  test("doesn't interrupt property chain, using array arg", function() {
    let obj1 = { a: 5 };
    expect(bbo.set(obj1, ['a', 'aa', 'aaa'], 4)).toEqual(false);
    // ok to clobber last property
    let obj2 = { a: { aa: 9 } };
    expect(bbo.set(obj2, ['a', 'aa'], { bbb: 7 })).toEqual(true);
  });

  if (typeof Symbol === 'function') {
    test('supports symbol prop', function() {
      let obj1 = { a: {} };
      // eslint-disable-next-line symbol-description
      let sym = Symbol();
      expect(bbo.set(obj1.a, sym, 7)).toEqual(true);
      expect(obj1.a[sym] === 7);
    });
  }
});
