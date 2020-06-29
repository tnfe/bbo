import assert from 'assert';
import { args, slice, symbol, realm } from '../const';
import bbo from '../bbo';

describe('isString', function() {
  it('should return `true` for strings', function() {
    assert.strictEqual(bbo.isString('a'), true);
    assert.strictEqual(bbo.isString(Object('a')), true);
  });

  it('should return `false` for non-strings', function() {
    assert.strictEqual(bbo.isString(args), false);
    assert.strictEqual(bbo.isString([1, 2, 3]), false);
    assert.strictEqual(bbo.isString(true), false);
    assert.strictEqual(bbo.isString(new Date()), false);
    assert.strictEqual(bbo.isString(new Error()), false);
    assert.strictEqual(bbo.isString(slice), false);
    assert.strictEqual(bbo.isString({ '0': 1, length: 1 }), false);
    assert.strictEqual(bbo.isString(1), false);
    assert.strictEqual(bbo.isString(/x/), false);
    assert.strictEqual(bbo.isString(symbol), false);
  });

  it('should work with strings from another realm', function() {
    if (realm.string) {
      assert.strictEqual(bbo.isString(realm.string), true);
    }
  });
});
