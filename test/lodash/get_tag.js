import assert from 'assert';
import { funcTag, numberTag, objectTag, arrayTag } from '../const';
import lodashStable from 'lodash';
import bbo from '../bbo';

describe('getTag', function() {
  let tags = [() => {}, 0, {}, []];
  let tagsName = [funcTag, numberTag, objectTag, arrayTag];
  lodashStable.each(tags, (methodName, index) => {
    it('bbo.getTag' + tagsName[index] + '` should support shortcut fusion', () => {
      assert.strictEqual(bbo.getTag(methodName), tagsName[index]);
    });
  });
});
