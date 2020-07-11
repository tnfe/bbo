/**
 * return an object from an array, keyed by the value at the given id
 */

import isArray from '../lodash/is_array';
import isString from '../lodash/is_string';

export default function indexBy(arr, key) {
  if (!isArray(arr)) {
    throw new Error('expected an array for first argument');
  }
  if (!isString(key)) {
    throw new Error('expected a string for second argument');
  }
  let result = {};
  let len = arr.length;
  for (let i = 0; i < len; i++) {
    let index = arr[i] && arr[i][key];

    if (index) {
      result[index] = arr[i];
    }
  }
  return result;
}
