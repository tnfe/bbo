/* eslint-disable eqeqeq */
/* eslint-disable guard-for-in */

/**
 * deep copies objects and arrays
 * Deep clones all properties except functions
 */

import isFunction from '../lodash/is_function';
import isArray from '../lodash/is_array';

export default function clone(obj) {
  // var arr = [1, 2, 3];
  // var subObj = { aa: 1 };
  // var obj = { a: 3, b: 5, c: arr, d: subObj };
  // var objClone = bbo.clone(obj);
  // arr.push(4);
  // subObj.bb = 2;
  // obj; // {a: 3, b: 5, c: [1, 2, 3, 4], d: {aa: 1}}
  // objClone; // {a: 3, b: 5, c: [1, 2, 3], d: {aa: 1, bb: 2}}
  if (isFunction(obj)) {
    return obj;
  }
  let result = isArray(obj) ? [] : {};
  for (let key in obj) {
    // include prototype properties
    let value = obj[key];
    let type = {}.toString.call(value).slice(8, -1);
    if (type == 'Array' || type == 'Object') {
      result[key] = clone(value);
    } else if (type == 'Date') {
      result[key] = new Date(value.getTime());
    } else if (type == 'RegExp') {
      result[key] = RegExp(value.source, getRegExpFlags(value));
    } else {
      result[key] = value;
    }
  }
  return result;
}

function getRegExpFlags(regExp) {
  if (typeof regExp.source.flags == 'string') {
    return regExp.source.flags;
  } else {
    let flags = [];
    regExp.global && flags.push('g');
    regExp.ignoreCase && flags.push('i');
    regExp.multiline && flags.push('m');
    regExp.sticky && flags.push('y');
    regExp.unicode && flags.push('u');
    return flags.join('');
  }
}
