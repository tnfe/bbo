/* eslint-disable no-param-reassign */
/* eslint-disable max-params */
export default function reduce(obj, predicate /* , initialValue */) {
  let args = [callback];

  let hasInitialValue = 2 in arguments;
  hasInitialValue && args.push(arguments[2]);

  function callback(previousValue, currentKey, currentIndex, array) {
    if (!hasInitialValue) {
      previousValue = obj[array[0]];
      hasInitialValue = true;
    }
    return predicate(previousValue, currentKey, obj[currentKey], currentIndex, array);
  }

  return Array.prototype.reduce.apply(Object.keys(obj), args);
}
