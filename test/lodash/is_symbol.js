import assert from 'assert';
import lodashStable from 'lodash';
import { symbol, falsey, stubFalse, args, slice, realm } from '../const';
import bbo from '../bbo';

describe('isSymbol', function() {
  it('should return `true` for symbols', function() {
    if (Symbol) {
      assert.strictEqual(bbo.isSymbol(symbol), true);
      assert.strictEqual(bbo.isSymbol(Object(symbol)), true);
    }
  });

  it('should return `false` for non-symbols', function() {
    let expected = lodashStable.map(falsey, stubFalse);

    let actual = lodashStable.map(falsey, function(value, index) {
      return index ? bbo.isSymbol(value) : bbo.isSymbol();
    });

    assert.deepStrictEqual(actual, expected);

    assert.strictEqual(bbo.isSymbol(args), false);
    assert.strictEqual(bbo.isSymbol([1, 2, 3]), false);
    assert.strictEqual(bbo.isSymbol(true), false);
    assert.strictEqual(bbo.isSymbol(new Date()), false);
    assert.strictEqual(bbo.isSymbol(new Error()), false);
    assert.strictEqual(bbo.isSymbol(slice), false);
    assert.strictEqual(bbo.isSymbol({ '0': 1, length: 1 }), false);
    assert.strictEqual(bbo.isSymbol(1), false);
    assert.strictEqual(bbo.isSymbol(/x/), false);
    assert.strictEqual(bbo.isSymbol('a'), false);
  });

  it('should work with symbols from another realm', function() {
    if (Symbol && realm.symbol) {
      assert.strictEqual(bbo.isSymbol(realm.symbol), true);
    }
  });
});
