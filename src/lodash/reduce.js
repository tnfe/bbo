import isArray from './is_array';
import isObject from './is_object';

export default function reduce(src, func) {
  let i = 0;
  let acc = arguments[2];
  if (isArray(src)) {
    if (arguments.length !== 3) {
      acc = src[0];
    }
    while (i < src.length) {
      acc = func(acc, src[i], i, src);
      i += 1;
    }
    return acc;
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    if (arguments.length !== 3) {
      acc = src[keys[0]];
    }
    while (i < keys.length) {
      const key = keys[i];
      acc = func(acc, src[key], key, src);
      i += 1;
    }
    return acc;
  }
  return acc;
}
