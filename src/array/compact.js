/**
 * Removes undefined and Null from an array.
 */
export default function compact(target) {
  return target.filter((item) => {
    return item !== undefined;
  });
}
