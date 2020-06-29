import isArray from '../lodash/is_array';
import isString from '../lodash/is_string';
import isObject from '../lodash/is_object';
import isMap from '../lodash/is_map';
import isSet from '../lodash/is_set';

export default function isEmpty(obj) {
  if (obj === null) {
    return true;
  }

  if (isArray(obj)) {
    return !obj.length;
  }

  if (isString(obj)) {
    return !obj.length;
  }

  if (isObject(obj)) {
    return !Object.keys(obj).length;
  }

  if (isMap(obj) || isSet(obj)) {
    return !obj.size;
  }

  // other primitive || unidentifed object type
  return Object(obj) !== obj || !Object.keys(obj).length;
}
