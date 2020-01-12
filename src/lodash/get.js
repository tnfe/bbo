/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */

import stringToPath from './string_to_path';
export default function get(object, path, defaultValue) {
  if (object == null) {
    return defaultValue;
  }
  if (!Array.isArray(path)) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    const reIsPlainProp = /^\w*$/;
    const isKey = function(value, object) {
      const type = typeof value;
      if (type == 'number' || type == 'boolean' || value == null) {
        return true;
      }
      return (
        reIsPlainProp.test(value) ||
        !reIsDeepProp.test(value) ||
        (object != null && value in Object(object))
      );
    };
    if (isKey(path, object)) {
      path = [path];
    } else {
      path = stringToPath(path);
    }
  }
  let index = 0;
  const length = path.length;
  while (object != null && index < length) {
    object = object[path[index]];
    index += 1;
  }
  if (index && index === length) {
    return object === undefined ? defaultValue : object;
  } else {
    return defaultValue;
  }
}
