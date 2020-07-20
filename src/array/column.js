/**
 * discuss at: https://locutus.io/php/array_column/
 */
import isObject from '../lodash/is_object';
import isArray from '../lodash/is_array';

export default function column(input, ColumnKey, IndexKey = null) {
  if (input !== null && (isObject(input) || isArray(input))) {
    let newarray = [];
    if (isObject(input)) {
      let temparray = [];
      for (let key of Object.keys(input)) {
        temparray.push(input[key]);
      }
      // eslint-disable-next-line no-param-reassign
      input = temparray;
    }
    if (isArray(input)) {
      for (let key of input.keys()) {
        if (IndexKey && input[key][IndexKey]) {
          if (ColumnKey) {
            newarray[input[key][IndexKey]] = input[key][ColumnKey];
          } else {
            newarray[input[key][IndexKey]] = input[key];
          }
        } else {
          if (ColumnKey) {
            newarray.push(input[key][ColumnKey]);
          } else {
            newarray.push(input[key]);
          }
        }
      }
    }
    // eslint-disable-next-line prefer-object-spread
    return Object.assign({}, newarray);
  } else {
    throw new Error('throw an error');
  }
}
