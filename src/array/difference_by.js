/**
 * Returns the difference between two arrays,
 * after applying the provided function to each array element of both.
 */
export default function differenceBy(a, b, fn) {
  const s = new Set(b.map(fn));
  return a.map(fn).filter((el) => !s.has(el));
}
