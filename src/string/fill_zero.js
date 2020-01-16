/**
 * Increase by 0 based on string length before string
 */
export default function fillZero(target, n) {
  let z = new Array(n).join('0');
  let str = z + target;
  let result = str.slice(-n);
  return result;
}
