import isArray from '../lodash/is_array';
import isString from '../lodash/is_string';
import isMap from '../lodash/is_map';
import isSet from '../lodash/is_set';

/**
 * Gets the size of `collection` by returning its length for array-like
 * values or the number of own enumerable string keyed properties for objects.
 *
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the collection size.
 */
export default function size(collection) {
  if (collection === null || collection === undefined) {
    return 0;
  }
  if (isArray(collection) || isString(collection)) {
    return collection.length;
  }

  if (isMap(collection) || isSet(collection)) {
    return collection.size;
  }

  return Object.keys(collection).length;
}
