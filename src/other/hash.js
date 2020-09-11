/**
 * string hash map
 * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */
import size from '../collection/size';

export default function hash(str) {
  let _str = String(str);
  let hash = 0;
  let i;
  let chr;
  if (size(_str) === 0) return hash;
  for (i = 0; i < _str.length; i++) {
    chr = _str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}
