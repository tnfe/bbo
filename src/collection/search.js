import hasOwnProperty from '../args/has_own_property';

export default function search(needle, haystack, argStrict) {
  let strict = !!argStrict;
  let key = '';
  for (key in haystack) {
    if (hasOwnProperty(haystack, key)) {
      // eslint-disable-next-line eqeqeq
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key;
      }
    }
  }

  return false;
}
