/* eslint-disable no-invalid-this */
export default function debounce(fn, wait, callFirst) {
  let timeout;
  return function() {
    if (!wait) {
      return fn.apply(this, arguments);
    }
    let context = this;
    let args = arguments;
    let callNow = callFirst && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      timeout = null;
      if (!callNow) {
        return fn.apply(context, args);
      }
    }, wait);

    if (callNow) {
      return fn.apply(this, arguments);
    }
  };
}
