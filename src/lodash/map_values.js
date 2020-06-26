/*
  returns a new object with the predicate applied to each value
  like map-object, but (value, key, object) are passed to the predicate
*/

export default function mapValues(obj, predicate) {
  let result = {};
  let keys = Object.keys(obj);
  let len = keys.length;
  for (let i = 0; i < len; i++) {
    let key = keys[i];
    result[key] = predicate(obj[key], key, obj);
  }
  return result;
}
