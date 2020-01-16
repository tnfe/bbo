/**
 * Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
 */
const all = (arr, fn = Boolean) => arr.every(fn);

export default all;
