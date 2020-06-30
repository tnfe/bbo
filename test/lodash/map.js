/* eslint-disable max-nested-callbacks */
/* eslint-disable array-callback-return */
/* eslint-disable no-sparse-arrays */
import assert from 'assert';
import lodashStable from 'lodash';
import { identity, falsey, stubArray, document } from '../const';
import bbo from '../bbo';

describe('map', function() {
  let array = [1, 2];

  it('should map values in `collection` to a new array', function() {
    let object = { a: 1, b: 2 };
    let expected = ['1', '2'];

    assert.deepStrictEqual(bbo.map(array, String), expected);
    assert.deepStrictEqual(bbo.map(object, String), expected);
  });

  it('should iterate over own string keyed properties of objects', function() {
    function Foo() {
      this.a = 1;
    }
    Foo.prototype.b = 2;

    let actual = bbo.map(new Foo(), identity);
    assert.deepStrictEqual(actual, [1]);
  });

  it('should accept a falsey `collection`', function() {
    let expected = lodashStable.map(falsey, stubArray);

    let actual = lodashStable.map(falsey, function(collection, index) {
      try {
        return index ? bbo.map(collection) : bbo.map();
      } catch (e) {}
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should treat number values for `collection` as empty', function() {
    assert.deepStrictEqual(bbo.map(1), []);
  });

  it('should treat a nodelist as an array-like object', function() {
    if (document) {
      let actual = bbo.map(document.getElementsByTagName('body'), function(element) {
        return element.nodeName.toLowerCase();
      });

      assert.deepStrictEqual(actual, ['body']);
    }
  });

  it('should work with objects with non-number length properties', function() {
    let value = { value: 'x' };
    let object = { length: { value: 'x' } };

    assert.deepStrictEqual(bbo.map(object, identity), [value]);
  });
});
