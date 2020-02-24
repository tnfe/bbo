/**
 * return an object from an array, keyed by the value at the given id
 */

import isArray from '../lodash/is_array';
import isString from '../lodash/is_string';

export default function indexBy(arr, key) {
  // bbp.indexBy([{id: 'first', val: 1}, {id: 'second', val: 2}], 'id');
  // => {first: {id: 'first', val: 1}, second: {id: // 'second', val: 2}}
  // indexBy([{id: 'first', val: 1}, null], 'id');
  // => {first: {id: 'first', val: 1}}
  // indexBy([], 'id'); // => {}
  // indexBy([], null); // => throws
  // indexBy({}, 'id'); // => throws

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
