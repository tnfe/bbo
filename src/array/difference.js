/**
 * Returns the difference between two arrays.
 * Create a Set from b, then use Array.prototype.
 * Filter() on a to only keep values not contained in b.
 */
export default function difference(a, b) {
  const s = new Set(b);
  return a.filter((x) => !s.has(x));
}
