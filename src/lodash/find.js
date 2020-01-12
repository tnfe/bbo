import forEach from './for_each';
import isFunction from './is_function';
import isObject from './is_object';
import is from './is';
import isShallowEqual from './is_shallow_equal';

export default function find(src, func) {
  // eslint-disable-next-line no-undef-init
  let rst = undefined;
  forEach(src, (item, key, obj) => {
    if (isFunction(func)) {
      if (func(item, key, obj) === true) {
        rst = item;
        return false;
      }
    } else if (is(item, func)) {
      rst = item;
      return false;
    } else if (isObject(item) && isObject(func)) {
      let subEqual = true;
      forEach(func, (v, k) => {
        subEqual = isShallowEqual(item[k], v);
        return subEqual;
      });
      if (subEqual) {
        rst = item;
        return false;
      }
    }
  });
  return rst;
}
