/**
 * arguments to array
 */
function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}
/**
 * a trash object
 */


var trash = {
  clear: function () {
    for (var key in trash) {
      if (key !== 'log' && key !== 'clear') delete trash[key];
    }
  },
  log: function () {
    for (var key in trash) {
      if (key !== 'log' && key !== 'clear') console.log('bbo.trash:: ', key, trash[key]);
    }
  }
};

var noop = () => {};

var merge = function () {
  for (var _len = arguments.length, objs = new Array(_len), _key = 0; _key < _len; _key++) {
    objs[_key] = arguments[_key];
  }

  return [].concat(objs).reduce((acc, obj) => Object.keys(obj).reduce((a, k) => {
    acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
    return acc;
  }, {}), {});
};

var over = function () {
  for (var _len2 = arguments.length, fns = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    fns[_key2] = arguments[_key2];
  }

  return function () {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return fns.map(fn => fn.apply(null, args));
  };
};

var call = function (key) {
  for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
    args[_key4 - 1] = arguments[_key4];
  }

  return context => context[key].apply(context, args);
};

export { args, call, merge, noop, over, trash };
