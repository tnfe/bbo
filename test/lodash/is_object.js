import assert from 'assert';
import lodashStable from 'lodash';
import { args, slice, document, body, symbol, falsey, stubFalse, realm } from '../const';
import bbo from '../bbo';

describe('isObject', function() {
  it('should return `true` for objects', function() {
    assert.strictEqual(bbo.isObject(args), true);
    assert.strictEqual(bbo.isObject([1, 2, 3]), true);
    assert.strictEqual(bbo.isObject(Object(false)), true);
    assert.strictEqual(bbo.isObject(new Date()), true);
    assert.strictEqual(bbo.isObject(new Error()), true);
    assert.strictEqual(bbo.isObject(slice), true);
    assert.strictEqual(bbo.isObject({ a: 1 }), true);
    assert.strictEqual(bbo.isObject(Object(0)), true);
    assert.strictEqual(bbo.isObject(/x/), true);
    assert.strictEqual(bbo.isObject(Object('a')), true);

    if (document) {
      assert.strictEqual(bbo.isObject(body), true);
    }
    if (Symbol) {
      assert.strictEqual(bbo.isObject(Object(symbol)), true);
    }
  });

  it('should return `false` for non-objects', function() {
    let values = falsey.concat(true, 1, 'a', symbol);
    let expected = lodashStable.map(values, stubFalse);

    let actual = lodashStable.map(values, function(value, index) {
      return index ? bbo.isObject(value) : bbo.isObject();
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with objects from another realm', function() {
    if (realm.element) {
      assert.strictEqual(bbo.isObject(realm.element), true);
    }
    if (realm.object) {
      assert.strictEqual(bbo.isObject(realm.boolean), true);
      assert.strictEqual(bbo.isObject(realm.date), true);
      assert.strictEqual(bbo.isObject(realm.function), true);
      assert.strictEqual(bbo.isObject(realm.number), true);
      assert.strictEqual(bbo.isObject(realm.object), true);
      assert.strictEqual(bbo.isObject(realm.regexp), true);
      assert.strictEqual(bbo.isObject(realm.string), true);
    }
  });
});
