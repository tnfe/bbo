/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */

/**
 * set value at property, create intermediate properties if necessary
 */
import isString from './is_string';
import isSymbol from './is_symbol';
import isObject from './is_object';

export default function set(obj, props, value) {
  if (isString(props)) {
    props = props.split('.');
  }
  if (isSymbol(props)) {
    props = [props];
  }
  let lastProp = props.pop();
  if (!lastProp) {
    return false;
  }
  let thisProp;
  while ((thisProp = props.shift())) {
    if (typeof obj[thisProp] == 'undefined') {
      obj[thisProp] = {};
    }
    obj = obj[thisProp];
    if (!obj || !isObject(obj)) {
      return false;
    }
  }
  obj[lastProp] = value;
  return true;
}
