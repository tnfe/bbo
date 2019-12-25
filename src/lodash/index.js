/* eslint-disable */
/**
 *  Mini lodash is easy to implement, consistent with the lodash class name.
 *  Function parameters only implement basic verification.
 *  Which is less stable than lodash
 *
 */
function getTag(src) {
  return Object.prototype.toString.call(src);
}

function hasOwnProperty(obj, keyName) {
  return Object.prototype.hasOwnProperty.call(obj, keyName);
}

function isObject(obj) {
  return getTag(obj) === '[object Object]';
}

function isArray(arr) {
  return getTag(arr) === '[object Array]';
}

function isString(str) {
  return getTag(str) === '[object String]';
}

function isBoolean(bool) {
  return getTag(bool) === '[object Boolean]';
}

function isNumber(number) {
  return getTag(number) === '[object Number]';
}

function isMap(map) {
  return getTag(map) === '[object Map]';
}

function isSet(set) {
  return getTag(set) === '[object Set]';
}

function isFunction(func) {
  return getTag(func) === '[object Function]';
}

const isEmpty = (val) => val == null || !(Object.keys(val) || val).length;

function is(x, y) {
  // inlined Object.is polyFill to avoid requiring consumers ship their own
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

function isShallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }
  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) {
    return false;
  }
  let i = 0;
  while (i < keysA.length) {
    if (!hasOwnProperty(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
    i += 1;
  }
  return true;
}

function has(obj, keyName) {
  return obj !== null && obj !== undefined && hasOwnProperty(obj, keyName);
}

function reduce(src, func) {
  let i = 0;
  let acc = arguments[2];
  if (isArray(src)) {
    if (arguments.length !== 3) {
      acc = src[0];
    }
    while (i < src.length) {
      acc = func(acc, src[i], i, src);
      i += 1;
    }
    return acc;
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    if (arguments.length !== 3) {
      acc = src[keys[0]];
    }
    while (i < keys.length) {
      const key = keys[i];
      acc = func(acc, src[key], key, src);
      i += 1;
    }
    return acc;
  }
  return acc;
}

function forEach(src, func) {
  let i = 0;
  if (isArray(src)) {
    while (i < src.length) {
      const rst = func(src[i], i, src);
      if (rst === false) {
        break;
      }
      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    while (i < keys.length) {
      const key = keys[i];
      const rst = func(src[key], key, src);
      if (rst === false) {
        break;
      }
      i += 1;
    }
  }
}

function map(src, func) {
  const rst = [];
  let i = 0;
  if (isArray(src)) {
    while (i < src.length) {
      rst.push(func(src[i], i, src));
      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);
    while (i < keys.length) {
      const key = keys[i];
      rst.push(func(src[key], key, src));
      i += 1;
    }
  }
  return rst;
}

function findIndex(src, func) {
  let rst = -1;
  forEach(src, (item, index, obj) => {
    if (isFunction(func)) {
      if (func(item, index, obj) === true) {
        rst = index;
        return false;
      }
    } else {
      if (isShallowEqual(item, func)) {
        rst = index;
        return false;
      }
    }
  });
  return rst;
}

function find(src, func) {
  let rst = undefined;
  forEach(src, (item, key, obj) => {
    if (isFunction(func)) {
      if (func(item, key, obj) === true) {
        rst = item;
        return false;
      }
    } else {
      if (isShallowEqual(item, func)) {
        rst = item;
        return false;
      }
    }
  });
  return rst;
}

const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g;

const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

function stringToPath(string) {
  const result = [];
  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }
  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;
    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }
    result.push(key);
  });
  return result;
}

function toPath(value) {
  if (!isString(value)) {
    return [];
  }
  return stringToPath(value);
}

function get(object, path, defaultValue) {
  if (object == null) {
    return defaultValue;
  }
  if (!Array.isArray(path)) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    const reIsPlainProp = /^\w*$/;
    const isKey = function(value, object) {
      const type = typeof value;
      if (type == 'number' || type == 'boolean' || value == null) {
        return true;
      }
      return (
        reIsPlainProp.test(value) ||
        !reIsDeepProp.test(value) ||
        (object != null && value in Object(object))
      );
    };
    if (isKey(path, object)) {
      path = [path];
    } else {
      path = stringToPath(path);
    }
  }
  let index = 0;
  const length = path.length;
  while (object != null && index < length) {
    object = object[path[index]];
    index += 1;
  }
  if (index && index === length) {
    return object === undefined ? defaultValue : object;
  } else {
    return defaultValue;
  }
}

function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true;

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF = !wait && wait !== 0 && typeof requestAnimationFrame === 'function';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer(id) {
    if (useRAF) {
      return cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // deBounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  return debounced;
}

function throttle(func, wait, options) {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }
  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }
  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
}

const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

// Only omit the first-level key, shallow copy objec
const omit = (obj, arr) =>
  Object.keys(obj)
    .filter((k) => !arr.includes(k))
    .reduce((acc, key) => ((acc[key] = obj[key]), acc), {});

export {
  getTag,
  hasOwnProperty,
  isObject,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isMap,
  isSet,
  isFunction,
  isEmpty,
  isShallowEqual,
  has,
  reduce,
  forEach,
  map,
  findIndex,
  find,
  toPath,
  get,
  debounce,
  throttle,
  pick,
  omit
};
