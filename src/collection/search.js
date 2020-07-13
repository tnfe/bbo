import isFunction from '../lodash/is_function';

export default function search(needle, haystack, argStrict) {
  let strict = !!argStrict;
  let key = '';
  let _needle = needle;

  if (isFunction(_needle) && _needle.exec) {
    // Duck-type for RegExp
    if (!strict) {
      // Let's consider case sensitive searches as strict
      let flags =
        'i' +
        (_needle.global ? 'g' : '') +
        (_needle.multiline ? 'm' : '') +
        // sticky is FF only
        (_needle.sticky ? 'y' : '');
      _needle = new RegExp(_needle.source, flags);
    }
    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        if (_needle.test(haystack[key])) {
          return key;
        }
      }
    }
    return false;
  }

  for (key in haystack) {
    if (haystack.hasOwnProperty(key)) {
      // eslint-disable-next-line eqeqeq
      if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
        return key;
      }
    }
  }

  return false;
}
