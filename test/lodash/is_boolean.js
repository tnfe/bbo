import assert from 'assert';
import bbo from '../bbo';
import { args, slice, symbol, realm } from '../const';

describe('isBoolean', function() {
  it('should return `true` for booleans', function() {
    assert.strictEqual(bbo.isBoolean(true), true);
    assert.strictEqual(bbo.isBoolean(false), true);
    assert.strictEqual(bbo.isBoolean(Object(true)), true);
    assert.strictEqual(bbo.isBoolean(Object(false)), true);
  });

  it('should return `false` for non-booleans', function() {
    assert.strictEqual(bbo.isBoolean(args), false);
    assert.strictEqual(bbo.isBoolean([1, 2, 3]), false);
    assert.strictEqual(bbo.isBoolean(new Date()), false);
    assert.strictEqual(bbo.isBoolean(new Error()), false);
    assert.strictEqual(bbo.isBoolean(slice), false);
    assert.strictEqual(bbo.isBoolean({ a: 1 }), false);
    assert.strictEqual(bbo.isBoolean(1), false);
    assert.strictEqual(bbo.isBoolean(/x/), false);
    assert.strictEqual(bbo.isBoolean('a'), false);
    assert.strictEqual(bbo.isBoolean(symbol), false);
  });

  it('should work with a boolean from another realm', function() {
    if (realm.boolean) {
      assert.strictEqual(bbo.isBoolean(realm.boolean), true);
    }
  });
});
