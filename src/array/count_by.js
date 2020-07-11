/**
 * Groups the elements of an array based on the given function and returns the count of elements in each group.
 */

import isFunction from '../lodash/is_function';

const countBy = (arr, fn) => {
  return arr.map(isFunction(fn) ? fn : (val) => val[fn]).reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
  }, {});
};

export default countBy;
