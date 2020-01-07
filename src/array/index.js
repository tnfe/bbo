/**
 * Array
 */
let array = {
  /**
   * Returns all unique values of an array.
   */
  unique: (arr) => [...new Set(arr)],

  /**
   * Returns all unique values of an array, based on a provided comparator function.
   */
  uniqueBy: (arr, fn) =>
    arr.reduce((acc, v) => {
      if (!acc.some((x) => fn(v, x))) acc.push(v);
      return acc;
    }, []),

  /**
   * 数组根据对象中的元素值去重
   * https://stackoverflow.com/questions/2218999/remove-duplicates-from-an-array-of-objects-in-javascript
   */
  uniqueFrom: (arr, target) => {
    return Object.values(arr.reduce((acc, cur) => Object.assign(acc, { [cur[target]]: cur }), {}));
  },

  /**
   * Returns a random element from an array.
   */
  random: (arr) => arr[Math.floor(Math.random() * arr.length)],

  /**
   * Gets n random elements at unique keys from array up to the size of array.
   */
  randomSize: ([...arr], n = 1) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }
    return arr.slice(0, n);
  },

  /**
   * Randomizes the order of the values of an array, returning a new array.
   */
  shuffle: ([...arr]) => {
    let m = arr.length;
    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
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
  includesAll: (arr, values) => values.every((v) => arr.includes(v)),

  /**
   * Returns true if at least one element of values is included in arr , false otherwise.
   */
  includesAny: (arr, values) => values.some((v) => arr.includes(v)),

  /**
   * Remove the element specified by parameter 2 in parameter 1 and return Boolean
   */
  removeAt: function(target, index) {
    return !!target.splice(index, 1).length;
  },

  /**
   * Remove parameter 2 in parameter 1 and return boolean
   */
  remove: function(target, item) {
    let index = target.indexOf(item);
    return index > -1 ? this.removeAt(target, index) : false;
  },

  /**
   * Removes undefined and Null from an array.
   */
  compact: (target) => {
    return target.filter((item) => {
      return item !== undefined;
    });
  },

  /**
   * Removes falsy values from an array.
   * (false, null, 0, "", undefined, and NaN).
   */
  compactAll: (arr) => arr.filter(Boolean),

  /**
   * Get the attribute values in an array object and combine them into a new array
   */
  pluck: (target, name) => {
    let result = [];
    let temp;
    target.forEach(function(item) {
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
  union: (a, b) => Array.from(new Set([...a, ...b])),

  /**
   * Returns every element that exists in any of the two arrays once,
   * after applying the provided function to each array element of both.
   */
  unionBy: (a, b, fn) => {
    const s = new Set(a.map(fn));
    return Array.from(new Set([...a, ...b.filter((x) => !s.has(fn(x)))]));
  },

  /**
   * Returns every element that exists in any of the two arrays once,
   * using a provided comparator function.
   */
  unionWith: (a, b, comp) => {
    Array.from(new Set([...a, ...b.filter((x) => a.findIndex((y) => comp(x, y)) === -1)]));
  },

  /**
   * Returns a list of elements that exist in both arrays.
   */
  intersect: (a, b) => {
    const s = new Set(b);
    return a.filter((x) => s.has(x));
  },

  /**
   * Returns a list of elements that exist in both arrays,
   * after applying the provided function to each array element of both.
   */
  intersectBy: (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter((x) => s.has(fn(x)));
  },

  /**
   * Returns the difference between two arrays.
   * Create a Set from b, then use Array.prototype.
   * Filter() on a to only keep values not contained in b.
   */
  difference: (a, b) => {
    const s = new Set(b);
    return a.filter((x) => !s.has(x));
  },

  /**
   * Returns the difference between two arrays,
   * after applying the provided function to each array element of both.
   */
  differenceBy: (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.map(fn).filter((el) => !s.has(el));
  },

  /**
   * Returns the largest element in an array
   */
  max: (target) => {
    return Math.max.apply(0, target);
  },

  /**
   * Returns the smallest element in an array
   */
  min: (target) => {
    return Math.min.apply(0, target);
  },

  /**
   * Check two arrays are equal
   */
  equal: (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  },

  /**
   * Check if all elements in an array are equal.
   */
  allEqual: (arr) => arr.every((val) => val === arr[0]),

  /**
   * Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
   */
  all: (arr, fn = Boolean) => arr.every(fn),

  /**
   * Returns true if the provided predicate function returns true for at least one element in a collection,
   * false otherwise.
   */
  any: (arr, fn = Boolean) => arr.some(fn),

  /**
   * Chunks an array into smaller arrays of a specified size.
   */
  chunk: (arr, size) => {
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  },

  /**
   * Groups the elements of an array based on the given function and returns the count of elements in each group.
   */
  countBy: (arr, fn) => {
    arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  },

  /**
   * Counts the occurrences of a value in an array.
   */
  countOccurrences: (arr, val) => {
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  },

  /**
   * Returns a new array with n elements removed from the left.
   */
  drop: (arr, n = 1) => arr.slice(n),

  /**
   * Returns a new array with n elements removed from the right.
   */
  dropRight: (arr, n = 1) => arr.slice(0, -n),

  /**
   * Removes elements in an array until the passed function returns true.
   * Returns the remaining elements in the array.
   */
  dropWhile: (arr, func) => {
    let _arr = arr;
    while (_arr.length > 0 && !func(_arr[0])) _arr = _arr.slice(1);
    return _arr;
  },

  /**
   * Removes elements from the end of an array until the passed function returns true,
   * Returns the remaining elements in the array.
   */
  dropRightWhile: (arr, func) => {
    let rightIndex = arr.length;
    while (rightIndex-- && !func(arr[rightIndex]));
    return arr.slice(0, rightIndex + 1);
  },

  /**
   * discuss at: https://locutus.io/php/array_column/
   */
  column: (input, ColumnKey, IndexKey = null) => {
    let _input = input;
    if (_input !== null && (typeof _input === 'object' || Array.isArray(_input))) {
      let newArray = [];
      if (typeof _input === 'object') {
        let tempArray = [];
        for (let key of Object.keys(_input)) {
          tempArray.push(_input[key]);
        }
        _input = tempArray;
      }
      if (Array.isArray(_input)) {
        for (let key of _input.keys()) {
          if (IndexKey && _input[key][IndexKey]) {
            if (ColumnKey) {
              newArray[_input[key][IndexKey]] = _input[key][ColumnKey];
            } else {
              newArray[_input[key][IndexKey]] = _input[key];
            }
          } else {
            if (ColumnKey) {
              newArray.push(_input[key][ColumnKey]);
            } else {
              newArray.push(_input[key]);
            }
          }
        }
      }
      return { ...newArray };
    }
  },

  search: (needle, haystack, argStrict) => {
    // discuss at: https://locutus.io/php/array_search/'
    // example 1: bbo.array.search('3', {a: 3, b: 5, c: 7})
    // returns 1: 'a'

    let strict = !!argStrict;
    let key = '';
    let _needle = needle;

    if (typeof _needle === 'object' && _needle.exec) {
      // Duck-type for RegExp
      if (!strict) {
        // Let's consider case sensitive searches as strict
        let flags =
          'i' +
          (_needle.global ? 'g' : '') +
          (_needle.multiline ? 'm' : '') +
          // sticky is FF only
          (_needle.sticky ? 'y' : '');
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
        if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
          return key;
        }
      }
    }

    return false;
  },

  unary: (fn) => (val) => fn(val)
};

export { array };
