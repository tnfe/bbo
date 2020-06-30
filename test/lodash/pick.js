import bbo from '../bbo';

describe('pick', function() {
  test('pick returns new object', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.pick(obj, []) !== obj).toBe(true);
  });

  test('pick using array', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.pick(obj, ['a', 'c'])).toStrictEqual({ a: 3, c: 9 });
  });

  test('pick using arguments', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.pick(obj, 'a', 'c')).toStrictEqual({ a: 3, c: 9 });
  });

  test('pick using a non-existent key', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.pick(obj, ['a', 'b', 'd'])).toStrictEqual({ a: 3, b: 5 });
  });

  test('pick using a duplicate key', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.pick(obj, ['a', 'a'])).toStrictEqual({ a: 3 });
  });

  test('pick where obj has a function value', function() {
    let fn = function() {
      return true;
    };
    let obj = {
      a: 3,
      b: fn
    };
    expect(bbo.pick(obj, 'b', { b: fn }));
  });
});
