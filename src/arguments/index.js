/**
 * arguments to array
 */
function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}

/**
 * a trash object
 */
let trash = {
  clear: function() {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') delete trash[key];
    }
  },
  log: function() {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') console.log('bbo.trash:: ', key, trash[key]);
    }
  }
};

const noop = () => {};

const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );

const over = (...fns) => (...args) => fns.map((fn) => fn.apply(null, args));

const call = (key, ...args) => (context) => context[key](...args);

export { args, trash, noop, merge, over, call };
