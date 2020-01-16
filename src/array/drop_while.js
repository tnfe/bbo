/**
 * Removes elements in an array until the passed function returns true.
 * Returns the remaining elements in the array.
 */
export default function dropWhile(arr, func) {
  let _arr = arr;
  while (_arr.length > 0 && !func(_arr[0])) _arr = _arr.slice(1);
  return _arr;
}
