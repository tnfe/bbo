/**
 * returns a copy of an array with falsey values removed
 */

import isArray from '../lodash/is_array';

export default function compact(arr) {
  if (!isArray(arr)) {
    throw new Error('expected an array');
  }
  let result = [];
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let elem = arr[i];
    if (elem) {
      result.push(elem);
    }
  }
  return result;
}
