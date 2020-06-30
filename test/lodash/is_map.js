import assert from 'assert';
import lodashStable from 'lodash';
import { map, falsey, stubFalse, args, slice, symbol, weakMap, realm } from '../const';
import bbo from '../bbo';

describe('isMap', function() {
  it('should return `true` for maps', function() {
    if (Map) {
      assert.strictEqual(bbo.isMap(map), true);
    }
  });

  it('should return `false` for non-maps', function() {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function(value, index) {
      return index ? bbo.isMap(value) : bbo.isMap();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(bbo.isMap(args), false);
    assert.strictEqual(bbo.isMap([1, 2, 3]), false);
    assert.strictEqual(bbo.isMap(true), false);
    assert.strictEqual(bbo.isMap(new Date()), false);
    assert.strictEqual(bbo.isMap(new Error()), false);
    assert.strictEqual(bbo.isMap(slice), false);
    assert.strictEqual(bbo.isMap({ a: 1 }), false);
    assert.strictEqual(bbo.isMap(1), false);
    assert.strictEqual(bbo.isMap(/x/), false);
    assert.strictEqual(bbo.isMap('a'), false);
    assert.strictEqual(bbo.isMap(symbol), false);
    assert.strictEqual(bbo.isMap(weakMap), false);
  });

  it('should work for objects with a non-function `constructor` (test in IE 11)', function() {
    let values = [false, true];
    let expected = lodashStable.map(values, stubFalse);

    let actual = lodashStable.map(values, function(value) {
      return bbo.isMap({ constructor: value });
    });

    assert.deepStrictEqual(actual, expected);
  });

  it('should work with maps from another realm', function() {
    if (realm.map) {
      assert.strictEqual(bbo.isMap(realm.map), true);
    }
  });
});
