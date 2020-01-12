/* eslint-disable no-eq-null */
/* eslint-disable eqeqeq */

import isArray from './is_array';
import isString from './is_string';
import isMap from './is_map';
import isObject from './is_object';
import isSet from './is_set';

export default function isEmpty(value) {
  if (value == null) {
    return true;
  }
  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }
  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }
  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }
  return true;
}
