/* eslint-disable max-params */
/* eslint-disable no-param-reassign */

/**
 * https://stackoverflow.com/questions/46042613/how-to-test-type-of-thrown-exception-in-jest
 */

let noop = function() {};
noop.toString = function() {
  return 'noop function';
};
let obj = { a: 3, b: 5, c: 9, d: null, e: noop };

import bbo from '../bbo';

describe('reduce', function() {
  test('initialValue', function() {
    let expectedKeys = Object.keys(obj);
    function getArgsInitialIndex(idx) {
      return function() {
        if (arguments[3] === idx) {
          return [].slice.call(arguments);
        }
        return arguments[0];
      };
    }

    // Without initialValue
    let result1 = bbo.reduce(obj, getArgsInitialIndex(1));
    expect(result1).toStrictEqual([3, 'b', 5, 1, expectedKeys]);

    // With initialValue
    let result2 = bbo.reduce(obj, getArgsInitialIndex(0), []);
    expect(result2).toStrictEqual([[], 'a', 3, 0, expectedKeys]);
  });

  test('pick returns new object', function() {
    let expectedKeys = Object.keys(obj);
    function getArgsInitialIndex(idx) {
      return function() {
        if (arguments[3] === idx) {
          return [].slice.call(arguments);
        }
        return arguments[0];
      };
    }
    let result1 = bbo.reduce(obj, getArgsInitialIndex(1));
    expect(result1).toStrictEqual([3, 'b', 5, 1, expectedKeys]);
  });

  test('use value', function() {
    let result1 = bbo.reduce(
      obj,
      function(target, key, value) {
        target.push(value);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual([3, 5, 9, null, noop]);

    let result2 = bbo.reduce(
      obj,
      function(target, key, value) {
        target += Number(value) || 0;
        return target;
      },
      0
    );
    expect(result2).toStrictEqual(17);

    let result3 = bbo.reduce(obj, function(target, key, value) {
      target += Number(value) || 0;
      return target;
    });
    expect(result3).toStrictEqual(17);
  });

  test('use key', function() {
    let result1 = bbo.reduce(
      obj,
      function(target, key, value) {
        target.push(key);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual(['a', 'b', 'c', 'd', 'e']);

    let result2 = bbo.reduce(
      obj,
      function(target, key, value, index) {
        target[index] = key;
        return target;
      },
      {}
    );
    expect(result2).toStrictEqual({ 0: 'a', 1: 'b', 2: 'c', 3: 'd', 4: 'e' });

    let result3 = bbo.reduce(obj, function(target, key, value) {
      target += key;
      return target;
    });
    expect(result3).toStrictEqual('3bcde');
  });

  test('use key and value', function() {
    let expectedResult1 = ['a is 3', 'b is 5', 'c is 9', 'd is null', 'e is noop function'];
    let result1 = bbo.reduce(
      obj,
      function(target, key, value) {
        target.push(key + ' is ' + value);
        return target;
      },
      []
    );
    expect(result1).toStrictEqual(expectedResult1);

    let result2 = bbo.reduce(
      obj,
      function(target, key, value) {
        target[value] = key;
        return target;
      },
      {}
    );

    expect(result2).toStrictEqual({
      3: 'a',
      5: 'b',
      9: 'c',
      null: 'd',
      'noop function': 'e'
    });
  });

  test('invalid usage', function() {
    expect(() => {
      bbo.reduce(obj);
    }).toThrow();

    expect(() => {
      bbo.reduce({}, noop);
    }).toThrow();
  });
});
