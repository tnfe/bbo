/* eslint-disable */
import noop from '../args/noop';
import isFunction from '../lodash/is_function';
import randomKey from '../random/random_key';

/**
 * JSONP handler
 *
 * Options:
 *  - param {String} qs parameter (`callback`)
 *  - prefix {String} qs parameter (`bbo`)
 *  - name {String} qs parameter (`prefix` + incr)
 *  - timeout {Number} how long after a timeout error is emitted (`60000`)
 *
 * @param {String} url
 * @param {Object|Function} optional options / callback
 * @param {Function} optional callback
 */
var debug = require('debug')('jsonp');
function jsonp(url, opts, fn) {
  if (isFunction(opts)) {
    fn = opts;
    opts = {};
  }
  if (!opts) opts = {};

  var prefix = opts.prefix || 'bbo';

  // use the callback name that was passed if one was provided.
  // otherwise generate a unique name by incrementing our counter.
  var id = opts.name || prefix + randomKey(10);

  var param = opts.param || 'callback';
  var timeout = null != opts.timeout ? opts.timeout : 60000;
  var enc = encodeURIComponent;
  var target = document.getElementsByTagName('script')[0] || document.head;
  var script;
  var timer;

  if (timeout) {
    timer = setTimeout(function() {
      cleanup();
      if (fn) fn(new Error('Timeout'));
    }, timeout);
  }

  function cleanup() {
    if (script.parentNode) script.parentNode.removeChild(script);
    window[id] = noop();
    if (timer) clearTimeout(timer);
  }

  function cancel() {
    if (window[id]) {
      cleanup();
    }
  }

  window[id] = function(data) {
    debug('jsonp got', data);
    cleanup();
    if (fn) fn(data, null);
  };

  // add qs component
  url += (~url.indexOf('?') ? '&' : '?') + param + '=' + enc(id);
  url = url.replace('?&', '?');

  debug('jsonp req "%s"', url);

  // create script
  script = document.createElement('script');
  script.src = url;
  target.parentNode.insertBefore(script, target);

  return cancel;
}

export default jsonp;
