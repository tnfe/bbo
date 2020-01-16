/**
 * Returns a list of elements that exist in both arrays.
 */
export default function intersect(a, b) {
  const s = new Set(b);
  return a.filter((x) => s.has(x));
}
