/**
 * Returns true if the provided predicate function returns true for at least one element in a collection,false otherwise.
 */
const any = (arr, fn = Boolean) => arr.some(fn);

export default any;
