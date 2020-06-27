import isObject from '../lodash/is_object';
import isBoolean from '../lodash/is_boolean';
import isArray from '../lodash/is_array';
import isFunction from '../lodash/is_function';

export default function extend(/* [deep], obj1, obj2, [objn] */) {
  let args = [].slice.call(arguments);
  let deep = false;
  if (isBoolean(args[0])) {
    deep = args.shift();
  }
  let result = args[0];
  if (isUnextendable(result)) {
    throw new Error('extendee must be an object');
  }
  let extenders = args.slice(1);
  let len = extenders.length;
  for (let i = 0; i < len; i++) {
    let extender = extenders[i];
    for (let key in extender) {
      if (extender.hasOwnProperty(key)) {
        let value = extender[key];
        if (deep && isCloneable(value)) {
          let base = isArray(value) ? [] : {};
          result[key] = extend(
            true,
            result.hasOwnProperty(key) && !isUnextendable(result[key]) ? result[key] : base,
            value
          );
        } else {
          result[key] = value;
        }
      }
    }
  }
  return result;
}

function isCloneable(obj) {
  return isArray(obj) || isObject(obj);
}

function isUnextendable(val) {
  return !val || (!isObject(val) && !isFunction(val));
}
