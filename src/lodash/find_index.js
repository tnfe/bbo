import forEach from './for_each';
import isFunction from './is_function';
import isObject from './is_object';
import is from './is';
import isShallowEqual from './is_shallow_equal';

export default function findIndex(src, func) {
  let rst = -1;
  forEach(src, (item, index, obj) => {
    if (isFunction(func)) {
      if (func(item, index, obj) === true) {
        rst = index;
        return false;
      }
    } else if (is(item, func)) {
      rst = index;
      return false;
    } else if (isObject(item) && isObject(func)) {
      let subEqual = true;
      forEach(func, (v, k) => {
        subEqual = isShallowEqual(item[k], v);
        return subEqual;
      });
      if (subEqual) {
        rst = index;
        return false;
      }
    }
  });
  return rst;
}
