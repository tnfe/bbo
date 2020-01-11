'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index.js');

/************************************************************************
 * LOGS
 *************************************************************************/

/**
 * log on mobile html body
 */

function log(msg, styles) {
  var ele = document.getElementById('_bbo_log');

  if (ele === null) {
    ele = document.createElement('div');
    ele.setAttribute('id', '_bbo_log');
    ele.setAttribute('style', 'position:fixed;left:0;top:0;z-index:9999;padding:4px;');
    document.body.appendChild(ele);
  }

  if (styles) {
    for (var style in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, style)) {
        ele.style[style] = styles[style];
      }
    }
  }

  ele.innerHTML = msg;
}
/**
 * bbo.logs('only id&10', 1, 2);
 */


function logs() {
  if (window.console && window.console.log) {
    var onlyId = String(arguments[0]);
    var times = parseInt(onlyId.split('&')[1], 10) || 10;
    var logsCache = _cache.logs;
    if (!logsCache[onlyId]) logsCache[onlyId] = {};
    if (!logsCache[onlyId].once) logsCache[onlyId].once = 1;

    if (logsCache[onlyId].once <= times) {
      console.log.apply(console, index.args(arguments, 1));
      logsCache[onlyId].once++;
    }
  }
}

function removeConsole(clear) {
  try {
    if (!window.console) window.console = {};
    window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace = index.noop;
    if (clear === 'clear' && window.console.clear) window.console.clear();
  } catch (e) {}
}
/************************************************************************
 *   Private Method
 *************************************************************************/


var _cache = {
  urls: {},
  logs: {}
};

exports.log = log;
exports.logs = logs;
exports.removeConsole = removeConsole;
