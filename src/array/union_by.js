/**
 * Returns every element that exists in any of the two arrays once,
 * after applying the provided function to each array element of both.
 */
const unionBy = (a, b, fn) => {
  const s = new Set(a.map(fn));
  return Array.from(new Set([...a, ...b.filter((x) => !s.has(fn(x)))]));
};

export default unionBy;
