/* eslint-disable max-nested-callbacks */
import assert from 'assert';
import lodashStable from 'lodash';
import bbo from '../bbo';
import { toArgs, stubTrue, args, symbol, defineProperty, stubFalse } from '../const';

describe('has', function() {
  lodashStable.each(['has'], function(methodName) {
    let func = bbo[methodName];
    let isHas = methodName === 'has';
    let sparseArgs = toArgs([1]);
    let sparseArray = Array(1);
    let sparseString = Object('a');

    delete sparseArgs[0];

    it('`bbo.' + methodName + '` should check for own properties', function() {
      let object = { a: 1 };

      lodashStable.each(['a', ['a']], function(path) {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(
      '`bbo.' + methodName + '` should not use the `hasOwnProperty` method of `object`',
      function() {
        let object = { hasOwnProperty: null, a: 1 };
        assert.strictEqual(func(object, 'a'), true);
      }
    );

    it('`bbo.' + methodName + '` should support deep paths', function() {
      let object = { a: { b: 2 } };

      lodashStable.each(['a.a', ['a', 'a']], function(path) {
        assert.strictEqual(func(object, path), false);
      });
    });

    it('`bbo.' + methodName + '` should work with `arguments` objects', function() {
      assert.strictEqual(func(args, 1), true);
    });

    it('`bbo.' + methodName + '` should work with a non-string `path`', function() {
      let array = [1, 2, 3];

      lodashStable.each([1, [1]], function(path) {
        assert.strictEqual(func(array, path), true);
      });
    });

    it('`bbo.' + methodName + '` should preserve the sign of `0`', function() {
      let object = { '-0': 'a', '0': 'b' };
      let props = [-0, Object(-0), 0, Object(0)];
      let expected = lodashStable.map(props, stubTrue);

      let actual = lodashStable.map(props, function(key) {
        return func(object, key);
      });

      assert.deepStrictEqual(actual, expected);
    });

    it('`bbo.' + methodName + '` should work with a symbol `path`', function() {
      function Foo() {}

      if (Symbol) {
        Foo.prototype[symbol] = 1;

        let symbol2 = Symbol('b');
        defineProperty(Foo.prototype, symbol2, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: 2
        });

        let object = isHas ? Foo.prototype : new Foo();
        assert.strictEqual(func(object, symbol), true);
        assert.strictEqual(func(object, symbol2), true);
      }
    });

    it('`bbo.' + methodName + '` should check for a key over a path', function() {
      let object = { 'a.b': 1 };

      lodashStable.each(['a.b', ['a.b']], function(path) {
        assert.strictEqual(func(object, path), true);
      });
    });

    it(
      '`bbo.' +
        methodName +
        '` should return `' +
        (isHas ? 'false' : 'true') +
        '` for inherited properties',
      function() {
        function Foo() {}
        Foo.prototype.a = 1;

        lodashStable.each(['a', ['a']], function(path) {
          assert.strictEqual(func(new Foo(), path), !isHas);
        });
      }
    );

    it(
      '`bbo.' +
        methodName +
        '` should return `' +
        (isHas ? 'false' : 'true') +
        '` for nested inherited properties',
      function() {
        function Foo() {}
        Foo.prototype.a = { b: 1 };

        lodashStable.each(['a.b', ['a', 'b']], function(path) {
          assert.strictEqual(func(new Foo(), path), !isHas);
        });
      }
    );

    it('`bbo.' + methodName + '` should return `false` when `object` is nullish', function() {
      let values = [null, undefined];
      let expected = lodashStable.map(values, stubFalse);

      lodashStable.each(['constructor', ['constructor']], function(path) {
        let actual = lodashStable.map(values, function(value) {
          return func(value, path);
        });

        assert.deepStrictEqual(actual, expected);
      });
    });

    it(
      '`bbo.' + methodName + '` should return `false` for deep paths when `object` is nullish',
      function() {
        let values = [null, undefined];
        let expected = lodashStable.map(values, stubFalse);

        lodashStable.each(
          ['constructor.prototype.valueOf', ['constructor', 'prototype', 'valueOf']],
          function(path) {
            let actual = lodashStable.map(values, function(value) {
              return func(value, path);
            });

            assert.deepStrictEqual(actual, expected);
          }
        );
      }
    );

    it(
      '`bbo.' + methodName + '` should return `false` for nullish values of nested objects',
      function() {
        // eslint-disable-next-line no-sparse-arrays
        let values = [, null, undefined];
        let expected = lodashStable.map(values, stubFalse);

        lodashStable.each(['a.b', ['a', 'b']], function(path) {
          let actual = lodashStable.map(values, function(value, index) {
            let object = index ? { a: value } : {};
            return func(object, path);
          });

          assert.deepStrictEqual(actual, expected);
        });
      }
    );

    it(
      '`bbo.' + methodName + '` should return `false` over sparse values of deep paths',
      function() {
        let values = [sparseArgs, sparseArray, sparseString];
        let expected = lodashStable.map(values, lodashStable.constant([false, false]));

        let actual = lodashStable.map(values, function(value) {
          return lodashStable.map(['a[0].b', ['a', '0', 'b']], function(path) {
            return func({ a: value }, path);
          });
        });

        assert.deepStrictEqual(actual, expected);
      }
    );
  });
});
