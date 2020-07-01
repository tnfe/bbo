import assert from 'assert';
import { args, slice, symbol, realm } from '../const';
import bbo from '../bbo';

describe('isNil', function() {
  it('should return `true` for nullish values', function() {
    assert.strictEqual(bbo.isNil(null), true);
    assert.strictEqual(bbo.isNil(), true);
    assert.strictEqual(bbo.isNil(undefined), true);
  });

  it('should return `false` for non-nullish values', function() {
    assert.strictEqual(bbo.isNil(args), false);
    assert.strictEqual(bbo.isNil([1, 2, 3]), false);
    assert.strictEqual(bbo.isNil(true), false);
    assert.strictEqual(bbo.isNil(new Date()), false);
    assert.strictEqual(bbo.isNil(new Error()), false);
    assert.strictEqual(bbo.isNil(slice), false);
    assert.strictEqual(bbo.isNil({ a: 1 }), false);
    assert.strictEqual(bbo.isNil(1), false);
    assert.strictEqual(bbo.isNil(/x/), false);
    assert.strictEqual(bbo.isNil('a'), false);

    if (Symbol) {
      assert.strictEqual(bbo.isNil(symbol), false);
    }
  });

  it('should work with nils from another realm', function() {
    if (realm.object) {
      assert.strictEqual(bbo.isNil(realm.null), true);
      assert.strictEqual(bbo.isNil(realm.undefined), true);
    }
  });
});
