import isNumber from '../lodash/is_number';
import isArray from '../lodash/is_array';

export default function split(arr, n) {
  if (!isArray(arr)) {
    throw new Error('expected an array for the first argument');
  }
  if (n !== null && !isNumber(n)) {
    throw new Error('expected a number or null for the second argument');
  }
  // eslint-disable-next-line no-param-reassign
  n = n !== null ? n : arr.length;
  let len = arr.length;
  let groups = [];
  for (let i = 0; i < len; i += n) {
    groups.push(arr.slice(i, i + n));
  }
  return groups;
}
