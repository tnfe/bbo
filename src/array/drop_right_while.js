/**
 * Removes elements from the end of an array until the passed function returns true,
 * Returns the remaining elements in the array.
 */
export default function dropRightWhile(arr, func) {
  let rightIndex = arr.length;
  while (rightIndex-- && !func(arr[rightIndex]));
  return arr.slice(0, rightIndex + 1);
}
