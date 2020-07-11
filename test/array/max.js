import bbo from '../bbo';
// import lodashStable from 'lodash';
// import { falsey, noop } from '../const';
import assert from 'assert';

describe('max', function() {
  it('should return the largest value from a collection', function() {
    assert.strictEqual(bbo.max([1, 2, 3]), 3);
  });

  // it('should return `undefined` for empty collections', function() {
  //   let values = falsey.concat([[]]);
  //   let expected = lodashStable.map(values, noop);

  //   let actual = lodashStable.map(values, function(value, index) {
  //     try {
  //       return index ? bbo.max(value) : bbo.max();
  //     } catch (e) {}
  //   });

  //   assert.deepStrictEqual(actual, expected);
  // });

  // it('should work with non-numeric collection values', function() {
  //   assert.strictEqual(bbo.max(['a', 'b']), 'b');
  // });
});
