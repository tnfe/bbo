import { _ as _toConsumableArray, a as _extends, b as _toArray } from './internal/_rollupPluginBabelHelpers.js';

/**
 * Array
 */
var array = {
  /**
   * Returns all unique values of an array.
   */
  unique: arr => _toConsumableArray(new Set(arr)),

  /**
   * Returns all unique values of an array, based on a provided comparator function.
   */
  uniqueBy: (arr, fn) => arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []),

  /**
   * Remove duplicates from an array of objects
   * https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
   */
  uniqueFrom: (arr, target) => {
    return Object.values(arr.reduce((acc, cur) => _extends(acc, {
      [cur[target]]: cur
    }), {}));
  },

  /**
   * Returns a random element from an array.
   */
  random: arr => arr[Math.floor(Math.random() * arr.length)],

  /**
   * Gets n random elements at unique keys from array up to the size of array.
   */
  randomSize: function (_ref) {
    var _ref2 = _toArray(_ref),
        arr = _ref2.slice(0);

    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var m = arr.length;

    while (m) {
      var i = Math.floor(Math.random() * m--);
      var _ref3 = [arr[i], arr[m]];
      arr[m] = _ref3[0];
      arr[i] = _ref3[1];
    }

    return arr.slice(0, n);
  },

  /**
   * Randomizes the order of the values of an array, returning a new array.
   */
  shuffle: (_ref4) => {
    var _ref5 = _toArray(_ref4),
        arr = _ref5.slice(0);

    var m = arr.length;

    while (m) {
      var i = Math.floor(Math.random() * m--);
      var _ref6 = [arr[i], arr[m]];
      arr[m] = _ref6[0];
      arr[i] = _ref6[1];
    }

    return arr;
  },

  /**
   * Returns true if the element has the specified Array, false otherwise.
   */
  contains: (target, item) => {
    return target.indexOf(item) > -1;
  },

  /**
   * Returns true if all the elements values are included in arr, false otherwise.
   */
  includesAll: (arr, values) => values.every(v => arr.includes(v)),

  /**
   * Returns true if at least one element of values is included in arr , false otherwise.
   */
  includesAny: (arr, values) => values.some(v => arr.includes(v)),

  /**
   * Remove the element specified by parameter 2 in parameter 1 and return Boolean
   */
  removeAt: function (target, index) {
    return !!target.splice(index, 1).length;
  },

  /**
   * Remove parameter 2 in parameter 1 and return boolean
   */
  remove: function (target, item) {
    var index = target.indexOf(item);
    return index > -1 ? this.removeAt(target, index) : false;
  },

  /**
   * Removes undefined and Null from an array.
   */
  compact: target => {
    return target.filter(item => {
      return item !== undefined;
    });
  },

  /**
   * Removes falsy values from an array.
   * (false, null, 0, "", undefined, and NaN).
   */
  compactAll: arr => arr.filter(Boolean),

  /**
   * Get the attribute values in an array object and combine them into a new array
   */
  pluck: (target, name) => {
    var result = [];
    var temp;
    target.forEach(function (item) {
      temp = item[name];

      if (temp !== null) {
        result.push(temp);
      }
    });
    return result;
  },

  /**
   * Returns every element that exists in any of the two arrays once
   * Create a Set with all values of a and b and convert to an array.
   */
  union: (a, b) => Array.from(new Set([].concat(_toConsumableArray(a), _toConsumableArray(b)))),

  /**
   * Returns every element that exists in any of the two arrays once,
   * after applying the provided function to each array element of both.
   */
  unionBy: (a, b, fn) => {
    var s = new Set(a.map(fn));
    return Array.from(new Set([].concat(_toConsumableArray(a), _toConsumableArray(b.filter(x => !s.has(fn(x)))))));
  },

  /**
   * Returns every element that exists in any of the two arrays once,
   * using a provided comparator function.
   */
  unionWith: (a, b, comp) => {
    Array.from(new Set([].concat(_toConsumableArray(a), _toConsumableArray(b.filter(x => a.findIndex(y => comp(x, y)) === -1)))));
  },

  /**
   * Returns a list of elements that exist in both arrays.
   */
  intersect: (a, b) => {
    var s = new Set(b);
    return a.filter(x => s.has(x));
  },

  /**
   * Returns a list of elements that exist in both arrays,
   * after applying the provided function to each array element of both.
   */
  intersectBy: (a, b, fn) => {
    var s = new Set(b.map(fn));
    return a.filter(x => s.has(fn(x)));
  },

  /**
   * Returns the difference between two arrays.
   * Create a Set from b, then use Array.prototype.
   * Filter() on a to only keep values not contained in b.
   */
  difference: (a, b) => {
    var s = new Set(b);
    return a.filter(x => !s.has(x));
  },

  /**
   * Returns the difference between two arrays,
   * after applying the provided function to each array element of both.
   */
  differenceBy: (a, b, fn) => {
    var s = new Set(b.map(fn));
    return a.map(fn).filter(el => !s.has(el));
  },

  /**
   * Returns the largest element in an array
   */
  max: target => {
    return Math.max.apply(0, target);
  },

  /**
   * Returns the smallest element in an array
   */
  min: target => {
    return Math.min.apply(0, target);
  },

  /**
   * Check two arrays are equal
   */
  equal: (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;

    for (var i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  },

  /**
   * Check if all elements in an array are equal.
   */
  allEqual: arr => arr.every(val => val === arr[0]),

  /**
   * Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
   */
  all: function (arr) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;
    return arr.every(fn);
  },

  /**
   * Returns true if the provided predicate function returns true for at least one element in a collection,
   * false otherwise.
   */
  any: function (arr) {
    var fn = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Boolean;
    return arr.some(fn);
  },

  /**
   * Chunks an array into smaller arrays of a specified size.
   */
  chunk: (arr, size) => {
    Array.from({
      length: Math.ceil(arr.length / size)
    }, (v, i) => arr.slice(i * size, i * size + size));
  },

  /**
   * Groups the elements of an array based on the given function and returns the count of elements in each group.
   */
  countBy: (arr, fn) => {
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  },

  /**
   * Counts the occurrences of a value in an array.
   */
  countOccurrences: (arr, val) => {
    arr.reduce((a, v) => v === val ? a + 1 : a, 0);
  },

  /**
   * Returns a new array with n elements removed from the left.
   */
  drop: function (arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return arr.slice(n);
  },

  /**
   * Returns a new array with n elements removed from the right.
   */
  dropRight: function (arr) {
    var n = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return arr.slice(0, -n);
  },

  /**
   * Removes elements in an array until the passed function returns true.
   * Returns the remaining elements in the array.
   */
  dropWhile: (arr, func) => {
    var _arr = arr;

    while (_arr.length > 0 && !func(_arr[0])) {
      _arr = _arr.slice(1);
    }

    return _arr;
  },

  /**
   * Removes elements from the end of an array until the passed function returns true,
   * Returns the remaining elements in the array.
   */
  dropRightWhile: (arr, func) => {
    var rightIndex = arr.length;

    while (rightIndex-- && !func(arr[rightIndex])) {
    }

    return arr.slice(0, rightIndex + 1);
  },

  /**
   * discuss at: https://locutus.io/php/array_column/
   */
  column: function (input, ColumnKey) {
    var IndexKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    var _input = input;

    if (_input !== null && (typeof _input === 'object' || Array.isArray(_input))) {
      var newArray = [];

      if (typeof _input === 'object') {
        var tempArray = [];

        for (var key of Object.keys(_input)) {
          tempArray.push(_input[key]);
        }

        _input = tempArray;
      }

      if (Array.isArray(_input)) {
        for (var _key of _input.keys()) {
          if (IndexKey && _input[_key][IndexKey]) {
            if (ColumnKey) {
              newArray[_input[_key][IndexKey]] = _input[_key][ColumnKey];
            } else {
              newArray[_input[_key][IndexKey]] = _input[_key];
            }
          } else {
            if (ColumnKey) {
              newArray.push(_input[_key][ColumnKey]);
            } else {
              newArray.push(_input[_key]);
            }
          }
        }
      }

      return { ...newArray
      };
    }
  },
  search: (needle, haystack, argStrict) => {
    // discuss at: https://locutus.io/php/array_search/'
    // example 1: bbo.array.search('3', {a: 3, b: 5, c: 7})
    // returns 1: 'a'
    var strict = !!argStrict;
    var key = '';
    var _needle = needle;

    if (typeof _needle === 'object' && _needle.exec) {
      // Duck-type for RegExp
      if (!strict) {
        // Let's consider case sensitive searches as strict
        var flags = 'i' + (_needle.global ? 'g' : '') + (_needle.multiline ? 'm' : '') + ( // sticky is FF only
        _needle.sticky ? 'y' : '');
        _needle = new RegExp(_needle.source, flags);
      }

      for (key in haystack) {
        if (haystack.hasOwnProperty(key)) {
          if (_needle.test(haystack[key])) {
            return key;
          }
        }
      }

      return false;
    }

    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        // eslint-disable-next-line eqeqeq
        if (strict && haystack[key] === needle || !strict && haystack[key] == needle) {
          return key;
        }
      }
    }

    return false;
  },
  unary: fn => val => fn(val)
};

export { array };
