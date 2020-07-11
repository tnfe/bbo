import bbo from '../bbo';
import assert from 'assert';

describe('min', function() {
  it('should return the largest value from a collection', function() {
    assert.strictEqual(bbo.min([1, 2, 3]), 1);
  });
});
