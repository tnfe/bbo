/**
 * arguments to array
 */

/**
 * Converts the arguments object to an array object and slice it.
 * first defalult is 0.
 * @export
 * @param {*} $arguments
 * @param {*} first
 * @returns
 */
export default function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}
