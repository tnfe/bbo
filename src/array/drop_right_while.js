/**
 * Removes elements from the end of an array until the passed function returns true,
 * Returns the remaining elements in the array.
 */

import size from '../collection/size';

export default function dropRightWhile(arr, func) {
  let rightIndex = size(arr);
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
}
