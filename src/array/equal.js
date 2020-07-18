/**
 * Check two arrays are equal
 */
import size from '../collection/size';
export default function equal(arr1, arr2) {
  let length = size(arr1);
  if (length !== size(arr2)) return false;
  for (let i = 0; i < length; i++) if (arr1[i] !== arr2[i]) return false;
  return true;
}
