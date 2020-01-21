/**
 * Whether a string contains another string
 */
export default function containsWith(target, item) {
  // discuss at: https://locutus.io/golang/strings/Contains
  // original by: Kevin van Zonneveld (https://kvz.io)
  // example 1: bbo.contains('Kevin', 'K')
  // returns 1: true
  return String(target).indexOf(item) !== -1;
}
