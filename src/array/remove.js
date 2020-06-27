import isArray from '../lodash/is_array';

export default function remove(arr1, arr2) {
  if (!isArray(arr1) || !isArray(arr2)) {
    throw new Error('expected both arguments to be arrays');
  }
  let result = [];
  let len = arr1.length;
  for (let i = 0; i < len; i++) {
    let elem = arr1[i];
    if (arr2.indexOf(elem) === -1) {
      result.push(elem);
    }
  }
  return result;
}
