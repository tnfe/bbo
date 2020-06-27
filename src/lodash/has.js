import hasOwnProperty from './has_own_property';

export default function has(object, key) {
  return object !== null && hasOwnProperty(object, key);
}
