import isFunction from '../lodash/is_function';
import isObject from '../lodash/is_object';
import isArray from '../lodash/is_array';

export default function values(obj) {
  let result = [];
  if (isArray(obj)) {
    return obj.slice(0);
  }
  if (isObject(obj) || isFunction(obj)) {
    let keys = Object.keys(obj);
    let len = keys.length;
    for (let i = 0; i < len; i++) {
      result.push(obj[keys[i]]);
    }
    return result;
  }
  throw new Error('argument to `values` must be an object');
}
