import isArray from './is_array';
import isObject from './is_object';

export default function map(src, func) {
  const rst = [];
  let i = 0;
  if (isArray(src)) {
    while (i < src.length) {
      rst.push(func(src[i], i, src));
      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    while (i < keys.length) {
      const key = keys[i];
      rst.push(func(src[key], key, src));
      i += 1;
    }
  }
  return rst;
}
