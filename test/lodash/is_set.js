import assert from 'assert';
import lodashStable from 'lodash';
import { set, falsey, stubFalse, args, slice, symbol, weakSet, realm } from '../const';
import bbo from '../bbo';

describe('isSet', function() {
  it('should return `true` for sets', function() {
    if (Set) {
      assert.strictEqual(bbo.isSet(set), true);
    }
  });

  it('should return `false` for non-sets', function() {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function(value, index) {
      return index ? bbo.isSet(value) : bbo.isSet();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(bbo.isSet(args), false);
    assert.strictEqual(bbo.isSet([1, 2, 3]), false);
    assert.strictEqual(bbo.isSet(true), false);
    assert.strictEqual(bbo.isSet(new Date()), false);
    assert.strictEqual(bbo.isSet(new Error()), false);
    assert.strictEqual(bbo.isSet(slice), false);
    assert.strictEqual(bbo.isSet({ a: 1 }), false);
    assert.strictEqual(bbo.isSet(1), false);
    assert.strictEqual(bbo.isSet(/x/), false);
    assert.strictEqual(bbo.isSet('a'), false);
    assert.strictEqual(bbo.isSet(symbol), false);
    assert.strictEqual(bbo.isSet(weakSet), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function() {
    let values = [false, true];
    let expected = lodashStable.map(values, stubFalse);

    let actual = lodashStable.map(values, function(value) {
      return bbo.isSet({ constructor: value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with weak sets from another realm', function() {
    if (realm.set) {
      assert.strictEqual(bbo.isSet(realm.set), true);
    }
  });
});
