/* eslint-disable no-param-reassign */
import isString from './is_string';
export default function pick(obj, select) {
  let result = {};
  if (isString(select)) {
    select = [].slice.call(arguments, 1);
  }
  let len = select.length;
  for (let i = 0; i < len; i++) {
    let key = select[i];
    if (key in obj) {
      result[key] = obj[key];
    }
  }
  return result;
}
