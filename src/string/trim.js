/**
 * Remove spaces after removing previous string
 */

export default function trim(str) {
  let _str = str.replace(/^\s+/, '');
  for (let i = str.length - 1; i >= 0; i--) {
    if (/\S/.test(str.charAt(i))) {
      _str = str.slice(0, i + 1);
      break;
    }
  }
  return _str;
}
