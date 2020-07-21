/* eslint-disable eqeqeq */
import isString from './is_string';
import isArray from './is_array';
import isSymbol from './is_symbol';
import map from './map';
import clone from '../collection/clone';
import stringToPath from './string_to_path';
// import copyArray from '../array/copyArray';

const INFINITY = 1 / 0;

function toKey(value) {
  if (isString(value) || isSymbol(value)) {
    return value;
  }
  const result = `${value}`;
  return result == '0' && 1 / value == -INFINITY ? '-0' : result;
}

export default function toPath(value) {
  if (isArray(value)) {
    return map(value, toKey);
  }
  return isSymbol(value) ? [value] : clone(stringToPath(String(value)));
}
