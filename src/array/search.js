export default function search(needle, haystack, argStrict) {
  // discuss at: https://locutus.io/php/array_search/'
  // example 1: bbo.array.search('3', {a: 3, b: 5, c: 7})
  // returns 1: 'a'

  let strict = !!argStrict;
  let key = '';
  let _needle = needle;

  if (typeof _needle === 'object' && _needle.exec) {
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
