import isFunction from '../lodash/is_function';
import isObject from '../lodash/is_object';

export default function entries(obj) {
  if ((!isObject(obj) && !isFunction(obj)) || obj === null) {
    throw new Error('argument to `entries` must be an object');
  }

  let result = [];
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      result.push([key, obj[key]]);
    }
  }
  return result;
}
