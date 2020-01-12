/**
 * arguments to array
 */
export default function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}
