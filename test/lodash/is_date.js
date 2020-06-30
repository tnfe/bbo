import assert from 'assert';
import lodashStable from 'lodash';
import { falsey, stubFalse, args, slice, symbol, realm } from '../const';
import bbo from '../bbo';

describe('isDate', function() {
  it('should return `true` for dates', function() {
    assert.strictEqual(bbo.isDate(new Date()), true);
  });

  it('should return `false` for non-dates', function() {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function(value, index) {
      return index ? bbo.isDate(value) : bbo.isDate();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(bbo.isDate(args), false);
    assert.strictEqual(bbo.isDate([1, 2, 3]), false);
    assert.strictEqual(bbo.isDate(true), false);
    assert.strictEqual(bbo.isDate(new Error()), false);
    assert.strictEqual(bbo.isDate(slice), false);
    assert.strictEqual(bbo.isDate({ a: 1 }), false);
    assert.strictEqual(bbo.isDate(1), false);
    assert.strictEqual(bbo.isDate(/x/), false);
    assert.strictEqual(bbo.isDate('a'), false);
    assert.strictEqual(bbo.isDate(symbol), false);
  });

  it('should work with a date object from another realm', function() {
    if (realm.date) {
      assert.strictEqual(bbo.isDate(realm.date), false);
    }
  });
});
