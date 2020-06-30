import bbo from '../bbo';

describe('omit', function() {
  it('omit returns new object', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.omit(obj, []) !== obj).toBe(true);
  });

  test('omit using array', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.omit(obj, ['a', 'c'])).toStrictEqual({ b: 5 });
  });

  test('omit using arguments', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.omit(obj, 'a', 'c')).toStrictEqual({ b: 5 });
  });

  test('omit using a non-existent key', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.omit(obj, ['a', 'b', 'd'])).toStrictEqual({ c: 9 });
  });

  test('omit using a duplicate key', function() {
    let obj = { a: 3, b: 5, c: 9 };
    expect(bbo.omit(obj, ['a', 'a'])).toStrictEqual({ b: 5, c: 9 });
  });

  test('omit where obj has a function value', function() {
    let fn = function() {
      return true;
    };
    let obj = {
      a: 3,
      b: fn
    };
    expect(bbo.omit(obj, 'a', { b: fn }));
  });
});
