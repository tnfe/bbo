import assert from 'assert';
import bbo from '../bbo';

describe('is', function() {
  it('using is normal', function() {
    assert.strictEqual(bbo.is('foo', 'foo'), true);
    assert.strictEqual(bbo.is(window, window), true);

    assert.strictEqual(bbo.is('foo', 'bar'), false);
    assert.strictEqual(bbo.is([], []), false);
  });

  it('using is null', function() {
    assert.strictEqual(bbo.is(null, null), true);
  });

  it('using is object', function() {
    let foo = { a: 1 };
    let bar = { a: 1 };
    assert.strictEqual(bbo.is(foo, foo), true);
    assert.strictEqual(bbo.is(foo, bar), false);
  });

  it('using special cases', function() {
    assert.strictEqual(bbo.is(0, -0), false);
    assert.strictEqual(bbo.is(-0, -0), true);
    assert.strictEqual(bbo.is(NaN, 0 / 0), true);
  });
});
