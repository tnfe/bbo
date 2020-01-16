/**
 * Remove the element specified by parameter 2 in parameter 1 and return Boolean
 */
export default function removeAt(target, index) {
  return !!target.splice(index, 1).length;
}
