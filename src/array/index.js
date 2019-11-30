/**
 * 数组方法
 */
let array = {
  /**
   * en:Returns all unique values of an array.
   * zh:数组去重
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
   * en:Returns a random element from an array.
   * zh:在数组中随机取一个
   */
  random: (arr) => arr[Math.floor(Math.random() * arr.length)],
  /**
   * en:Gets n random elements at unique keys from array up to the size of array.
   * zh:在数组中随机n个,可以视为bbo.array.random的升级版
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
   * en:Randomizes the order of the values of an array, returning a new array.
   * zh:打乱数组返回新数组
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
   * en:Returns true if the element has the specified Array, false otherwise.
   * zh:数组是否包含指定元素
   */
  contains: (target, item) => {
    return target.indexOf(item) > -1;
  },
  /**
   * en:Returns true if all the elements values are included in arr, false otherwise.
   * zh:数组是否包括另外一个数组的所有元素
   */
  includesAll: (arr, values) => values.every((v) => arr.includes(v)),
  /**
   * en:Returns true if at least one element of values is included in arr , false otherwise.
   * zh:数组是否包括另外一个数组的任一元素
   */
  includesAny: (arr, values) => values.some((v) => arr.includes(v)),
  /**
   * en:Remove the element specified by parameter 2 in parameter 1 and return Boolean
   * 在参数1中删除参数2指定位的元素返回布尔
   */
  removeAt: function(target, index) {
    return !!target.splice(index, 1).length;
  },
  /**
   * en:Remove parameter 2 in parameter 1 and return boolean
   * zh:在参数1中删除参数2返回布尔
   */
  remove: function(target, item) {
    let index = target.indexOf(item);
    return index > -1 ? this.removeAt(target, index) : false;
  },
  /**
   * en:Removes undefined and Null from an array.
   * zh:去除数组中的undefined和Null
   */
  compact: (target) => {
    return target.filter((item) => {
      return item !== undefined;
    });
  },
  /**
   * Removes falsy values from an array.
   * Use Array.prototype.filter() to filter out falsy values
   * (false, null, 0, "", undefined, and NaN).
   */
  compactAll: (arr) => arr.filter(Boolean),
  /**
   * en:Get the attribute values in an array object and combine them into a new array
   * zh:获取数组对象中的属性值，组合成新数组
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
   * en:Returns every element that exists in any of the two arrays once.
   * zh:取2个数组的并集
   * Create a Set with all values of a and b and convert to an array.
   */
  union: (a, b) => Array.from(new Set([...a, ...b])),
  /**
   * Returns every element that exists in any of the two arrays once,
   * after applying the provided function to each array element of both.
   *  */
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
   * en:Returns a list of elements that exist in both arrays.
   * zh:取2个数组的交集
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
   * en:Returns the difference between two arrays.
   * zh:取两个数组的差集
   * Create a Set from b, then use Array.prototype.filter() on a to only keep values not contained in b.
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
   * en:Returns the largest element in an array
   * zh:返回数组中最大值元素
   */
  max: (target) => {
    return Math.max.apply(0, target);
  },
  /**
   * en:Returns the smallest element in an array
   * zh:返回数组中最小值元素
   */
  min: (target) => {
    return Math.min.apply(0, target);
  },

  /**
   * en:Check two arrays are equal
   * zh:判断两个数组是否相同
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
   * en:Check if all elements in an array are equal.
   * zh:判断一个数组中所有元素是否相同
   * */
  allEqual: (arr) => arr.every((val) => val === arr[0]),

  /**
   * Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
   * Use Array.prototype.every() to test if all elements in the collection return true based on fn.
   * Omit the second argument, fn, to use Boolean as a default.
   */
  all: (arr, fn = Boolean) => arr.every(fn),

  /**
   * Returns true if the provided predicate function returns true for at least one element in a collection, false otherwise.
   * Use Array.prototype.some() to test if any elements in the collection return true based on fn.
   * Omit the second argument, fn, to use Boolean as a default.
   */
  any: (arr, fn = Boolean) => arr.some(fn),

  /**
   * Chunks an array into smaller arrays of a specified size.
   * Use Array.from() to create a new array, that fits the number of chunks that will be produced.
   * Use Array.prototype.slice() to map each element of the new array to a chunk the length of size.
   * If the original array can't be split evenly, the final chunk will contain the remaining elements.
   */
  chunk: (arr, size) => {
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );
  },

  /**
   * Groups the elements of an array based on the given function and returns the count of elements in each group.
   * Use Array.prototype.map() to map the values of an array to a function or property name.
   * Use Array.prototype.reduce() to create an object, where the keys are produced from the mapped results.
   */
  countBy: (arr, fn) => {
    arr.map(typeof fn === 'function' ? fn : (val) => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  },

  /**
   * Counts the occurrences of a value in an array.
   * Use Array.prototype.reduce() to increment a counter each time you encounter the specific value inside the array.
   */
  countOccurrences: (arr, val) => {
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
  },

  /**
   * en:Returns a new array with n elements removed from the left.
   * zh:返回一个新数组，其中左侧删除了n个元素。
   */
  drop: (arr, n = 1) => arr.slice(n),

  /**
   * en:Returns a new array with n elements removed from the right.
   * zh:返回一个新数组，其中右侧删除了n个元素。
   */
  dropRight: (arr, n = 1) => arr.slice(0, -n),

  /**
   * en:Removes elements in an array until the passed function returns true.
   * Returns the remaining elements in the array.
   * zh:删除数组中的元素，直到传递的函数返回true。 返回数组中剩余的元素。
   */
  dropWhile: (arr, func) => {
    let _arr = arr;
    while (_arr.length > 0 && !func(_arr[0])) _arr = _arr.slice(1);
    return _arr;
  },

  /**
   * en:Removes elements from the end of an array until the passed function returns true,
   * Returns the remaining elements in the array.
   * zh:从数组末尾删除元素，直到传递的函数返回true。 返回数组中剩余的元素。
   */
  dropRightWhile: (arr, func) => {
    let rightIndex = arr.length;
    while (rightIndex-- && !func(arr[rightIndex]));
    return arr.slice(0, rightIndex + 1);
  }
};

export { array };
