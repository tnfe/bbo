import assert from 'assert';
import bbo from '../bbo';

import { slice, asyncFunc, genFunc, args, symbol, document, realm } from '../const';

describe('isFunction', function() {
  it('should return `true` for functions', function() {
    assert.strictEqual(bbo.isFunction(_), true);
    assert.strictEqual(bbo.isFunction(slice), true);
  });

  it('should return `true` for async functions', function() {
    assert.strictEqual(bbo.isFunction(asyncFunc), typeof asyncFunc === 'function');
  });

  it('should return `true` for generator functions', function() {
    assert.strictEqual(bbo.isFunction(genFunc), typeof genFunc === 'function');
  });

  it('should return `true` for the `Proxy` constructor', function() {
    if (Proxy) {
      assert.strictEqual(bbo.isFunction(Proxy), true);
    }
  });

  it('should return `false` for non-functions', function() {
    assert.strictEqual(bbo.isFunction(args), false);
    assert.strictEqual(bbo.isFunction([1, 2, 3]), false);
    assert.strictEqual(bbo.isFunction(true), false);
    assert.strictEqual(bbo.isFunction(new Date()), false);
    assert.strictEqual(bbo.isFunction(new Error()), false);
    assert.strictEqual(bbo.isFunction({ a: 1 }), false);
    assert.strictEqual(bbo.isFunction(1), false);
    assert.strictEqual(bbo.isFunction(/x/), false);
    assert.strictEqual(bbo.isFunction('a'), false);
    assert.strictEqual(bbo.isFunction(symbol), false);

    if (document) {
      assert.strictEqual(bbo.isFunction(document.getElementsByTagName('body')), false);
    }
  });

  it('should work with a function from another realm', function() {
    if (realm.function) {
      assert.strictEqual(bbo.isFunction(realm.function), true);
    }
  });
});
