/* eslint-disable eqeqeq */
/* eslint-disable no-eq-null */
import hasOwnProperty from '../args/has_own_property';
export default function has(object, key) {
  return object != null && hasOwnProperty(object, key);
}
