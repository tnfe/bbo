import isArray from './is_array';
import isObject from './is_object';

export default function forEach(src, func) {
  let i = 0;
  if (isArray(src)) {
    while (i < src.length) {
      const rst = func(src[i], i, src);
      if (rst === false) {
        break;
      }
      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    while (i < keys.length) {
      const key = keys[i];
      const rst = func(src[key], key, src);
      if (rst === false) {
        break;
      }
      i += 1;
    }
  }
}
