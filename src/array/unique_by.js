/**
 * Returns all unique values of an array, based on a provided comparator function.
 */
const uniqueBy = (arr, fn) =>
  arr.reduce((acc, v) => {
    if (!acc.some((x) => fn(v, x))) acc.push(v);
    return acc;
  }, []);

export default uniqueBy;
