/**
 * Returns the length of a string in bytes by Unicode (utf-8 utf8 utf-16 utf16)
 */
export default function byteLen(str, charset) {
  let target = 0;
  let charCode;
  let i;
  let len;
  let _charset = charset ? charset.toLowerCase() : '';
  if (_charset === 'utf-16' || _charset === 'utf16') {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0xffff) {
        target += 2;
      } else {
        target += 4;
      }
    }
  } else {
    for (i = 0, len = str.length; i < len; i++) {
      charCode = str.charCodeAt(i);
      if (charCode <= 0x007f) {
        target += 1;
      } else if (charCode <= 0x07ff) {
        target += 2;
      } else if (charCode <= 0xffff) {
        target += 3;
      } else {
        target += 4;
      }
    }
  }
  return target;
}
