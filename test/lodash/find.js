import assert from 'assert';
import bbo from '../bbo';
import lodashStable from 'lodash';

import { LARGE_ARRAY_SIZE, isEven, square, _ } from '../const';

describe('find', function() {
  /**
   * QUnit.module('lodash.find and lodash.findLast'); time 2020-06-30
   * https://github.com/lodash/lodash/blob/4.5.0/test/test.js
   */
  it('bbo.find should support shortcut fusion', function() {
    let isFind = bbo['find'] === 'find';
    let findCount = 0;
    let mapCount = 0;
    let array = lodashStable.range(1, LARGE_ARRAY_SIZE + 1);
    let iteratee = function(value) {
      mapCount++;
      return square(value);
    };
    let predicate = function(value) {
      findCount++;
      return isEven(value);
    };
    let actual = _(array)
      .map(iteratee)
      ['find'](predicate);

    assert.strictEqual(findCount, isFind ? 1 : 2);
    assert.strictEqual(mapCount, isFind ? 1 : mapCount);
    assert.strictEqual(actual, isFind ? square(LARGE_ARRAY_SIZE) : actual);
  });
});
