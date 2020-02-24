/* eslint-disable eqeqeq */
/* eslint-disable no-param-reassign */

/**
 * set value at property, create intermediate properties if necessary
 */
import isString from './is_string';
import isSymbol from './is_symbol';
import isObject from './is_object';

export default function set(obj, props, value) {
  // var obj1 = {};
  // bbo.set(obj1, 'a.aa.aaa', 4); // true
  // obj1; // {a: {aa: {aaa: 4}}}
  // var obj2 = {};
  // bbo.set(obj2, ['a', 'aa', 'aaa'], 4); // true
  // obj2; // {a: {aa: {aaa: 4}}}
  // var obj3 = { a: { aa: { aaa: 2 } } };
  // bbo.set(obj3, 'a.aa.aaa', 3); // true
  // obj3; // {a: {aa: {aaa: 3}}}
  // // don't clobber existing
  // var obj4 = { a: { aa: { aaa: 2 } } };
  // bbo.set(obj4, 'a.aa', { bbb: 7 }); // false
  // const obj5 = { a: {} };
  // const sym = Symbol();
  // bbo.set(obj5.a, sym, 7); // true
  // obj5; // {a: {Symbol(): 7}}

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
