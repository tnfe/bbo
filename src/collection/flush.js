import isObject from '../lodash/is_object';

export default function flush(collection) {
  let result;
  let len;
  let i;
  if (!collection) {
    return undefined;
  }
  if (Array.isArray(collection)) {
    result = [];
    len = collection.length;
    for (i = 0; i < len; i++) {
      let elem = collection[i];
      if (elem !== null) {
        result.push(elem);
      }
    }
    return result;
  }
  if (isObject(collection)) {
    result = {};
    let keys = Object.keys(collection);
    len = keys.length;
    for (i = 0; i < len; i++) {
      let key = keys[i];
      let value = collection[key];
      if (value !== null) {
        result[key] = value;
      }
    }
    return result;
  }
  return undefined;
}
