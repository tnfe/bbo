import isString from './is_string';
import isSymbol from './is_symbol';
import isArray from './is_array';

export default function get(obj, propsArg, defaultValue) {
  if (!obj) {
    return defaultValue;
  }
  let props;
  let prop;
  if (Array.isArray(propsArg)) {
    props = propsArg.slice(0);
  }
  if (isString(propsArg)) {
    props = propsArg.split('.');
  }
  if (isSymbol(propsArg)) {
    props = [propsArg];
  }
  if (!isArray(props)) {
    throw new Error('props arg must be an array, a string or a symbol');
  }
  while (props.length) {
    prop = props.shift();
    if (!obj) {
      return defaultValue;
    }
    // eslint-disable-next-line no-param-reassign
    obj = obj[prop];
    if (obj === undefined) {
      return defaultValue;
    }
  }
  return obj;
}
