import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, args, slice, symbol, realm } from '../const';
import bbo from '../bbo';

describe('isNumber', function() {
  it('should return `true` for numbers', function() {
    assert.strictEqual(bbo.isNumber(0), true);
    assert.strictEqual(bbo.isNumber(Object(0)), true);
    assert.strictEqual(bbo.isNumber(NaN), true);
  });

  it('should return `false` for non-numbers', function() {
    let expected = lodashStable.map(falsey, function(value) {
      return typeof value === 'number';
    });

    let actual = lodashStable.map(falsey, function(value, index) {
      return index ? bbo.isNumber(value) : bbo.isNumber();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(bbo.isNumber(args), false);
    assert.strictEqual(bbo.isNumber([1, 2, 3]), false);
    assert.strictEqual(bbo.isNumber(true), false);
    assert.strictEqual(bbo.isNumber(new Date()), false);
    assert.strictEqual(bbo.isNumber(new Error()), false);
    assert.strictEqual(bbo.isNumber(slice), false);
    assert.strictEqual(bbo.isNumber({ a: 1 }), false);
    assert.strictEqual(bbo.isNumber(/x/), false);
    assert.strictEqual(bbo.isNumber('a'), false);
    assert.strictEqual(bbo.isNumber(symbol), false);
  });

  it('should work with numbers from another realm', function() {
    if (realm.number) {
      assert.strictEqual(bbo.isNumber(realm.number), true);
    }
  });
});
