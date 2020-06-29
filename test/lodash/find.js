import assert from 'assert';
import bbo from '../bbo';
import lodashStable from 'lodash';

import { LARGE_ARRAY_SIZE, isEven, square, _ } from '../const';

describe('find methods', function() {
  /**
   * time 2020-06-30 00:41:08
   * QUnit.module('lodash.find and lodash.findLast');
   * https://github.com/lodash/lodash/blob/4.5.0/test/test.js
   */

  lodashStable.each(['find', 'findIndex'], function(methodName) {
    let isFind = bbo[methodName] === 'find';

    it('bbo.' + methodName + '` should support shortcut fusion', function() {
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
        [methodName](predicate);

      assert.strictEqual(findCount, isFind ? 1 : 2);
      assert.strictEqual(mapCount, isFind ? 1 : mapCount);
      assert.strictEqual(actual, isFind ? square(LARGE_ARRAY_SIZE) : actual);
    });
  });

  // lodashStable.each(['find'], function(methodName) {
  //   let func = bbo[methodName];
  //   let expected = {
  //     find: [objects[1], objects[2]]
  //   }[methodName];
  //   it('`bbo.' + methodName + '` should return the found value', function() {
  //     assert.strictEqual(
  //       func(objects, function(object) {
  //         return object.a;
  //       }),
  //       expected[0]
  //     );
  //   });
  // });
});
