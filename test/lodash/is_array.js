import bbo from '../bbo';
import assert from 'assert';
import { args, slice, symbol, realm } from '../const';

describe('isArray', function() {
  it('should return `true` for arrays', function() {
    assert.strictEqual(bbo.isArray([1, 2, 3]), true);
  });

  it('should return `false` for non-arrays', function() {
    assert.strictEqual(bbo.isArray(args), false);
    assert.strictEqual(bbo.isArray(true), false);
    assert.strictEqual(bbo.isArray(new Date()), false);
    assert.strictEqual(bbo.isArray(new Error()), false);
    assert.strictEqual(bbo.isArray(slice), false);
    assert.strictEqual(bbo.isArray({ '0': 1, length: 1 }), false);
    assert.strictEqual(bbo.isArray(1), false);
    assert.strictEqual(bbo.isArray(/x/), false);
    assert.strictEqual(bbo.isArray('a'), false);
    assert.strictEqual(bbo.isArray(symbol), false);
  });

  it('should work with an array from another realm', function() {
    if (realm.array) {
      assert.strictEqual(bbo.isArray(realm.array), true);
    }
  });
});
