/**
 * Remove duplicates from an array of objects
 * https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
 */
export default function uniqueFrom(arr, target) {
  return Object.values(arr.reduce((acc, cur) => Object.assign(acc, { [cur[target]]: cur }), {}));
}
