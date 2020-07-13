/**
 * Returns every element that exists in any of the two arrays once,
 * using a provided comparator function.
 */
const unionWith = (a, b, comp) => {
  return Array.from(new Set([...a, ...b.filter((x) => a.findIndex((y) => comp(x, y)) === -1)]));
};

export default unionWith;
