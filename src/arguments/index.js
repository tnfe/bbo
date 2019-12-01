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

function noop() {}

const merge = (...objs) =>
  [...objs].reduce(
    (acc, obj) =>
      Object.keys(obj).reduce((a, k) => {
        acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
        return acc;
      }, {}),
    {}
  );

export { args, trash, noop, merge };
