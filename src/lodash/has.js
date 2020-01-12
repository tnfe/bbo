/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
/* eslint-disable no-param-reassign */
import isObject from './is_object';
import isArray from './is_array';
import toPath from './to_path';

export default function has(object, path) {
  if (!isObject(object)) {
    return false;
  }
  if (!isArray(path)) {
    path = toPath(path);
  }
  let index = -1;
  let length = path.length;
  let result = false;
  while (++index < length) {
    const key = String(path[index]);
    if (!(result = object != null && hasOwnProperty(object, key))) {
      break;
    }
    object = object[key];
  }
  // eslint-disable-next-line eqeqeq
  if (result || ++index != length) {
    return result;
  }
  return false;
}
