import bbo from '../bbo';

describe('mapValues', function() {
  test('applies predicate using value argument', () => {
    let obj1 = { a: 3, b: 5, c: 9 };
    let result1 = bbo.mapValues(obj1, function(value) {
      return value + 1;
    });
    expect(result1).toStrictEqual({ a: 4, b: 6, c: 10 });

    let obj2 = { a: 3, b: 0, c: null };
    let result2 = bbo.mapValues(obj2, function(value) {
      return Boolean(value);
    });
    expect(result2).toStrictEqual({ a: true, b: false, c: false });
  });

  test('applies predicate using key argument', function() {
    let obj1 = { a: 3, b: 5, c: 9 };
    let result1 = bbo.mapValues(obj1, function(value, key) {
      return key;
    });
    expect(result1).toStrictEqual({ a: 'a', b: 'b', c: 'c' });

    let obj2 = [1, 2, 3];
    let result2 = bbo.mapValues(obj2, function(value, key) {
      return Boolean(Number(key)) || key;
    });
    expect(result2).toStrictEqual({ 0: '0', 1: true, 2: true });
  });

  test('applies predicate using value and key arguments', function() {
    let obj1 = { a: 3, b: 5, c: 9 };
    let result1 = bbo.mapValues(obj1, function(value, key) {
      return key + value;
    });

    expect(result1).toStrictEqual({ a: 'a3', b: 'b5', c: 'c9' });
  });

  test('applies predicate using all arguments', function() {
    let obj1 = { a: 3, b: 5, c: 9 };
    let result1 = bbo.mapValues(obj1, function(value, key, obj) {
      return obj['b'] + value + key;
    });
    expect(result1).toStrictEqual({ a: '8a', b: '10b', c: '14c' });
  });
});
