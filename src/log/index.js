import { args, noop } from '../arguments/index';

/************************************************************************
 * LOGS
 *************************************************************************/
/**
 * log on mobile html body
 */

function log(msg, styles) {
  let ele = document.getElementById('_ppo_log');
  if (ele === null) {
    ele = document.createElement('div');
    ele.setAttribute('id', '_ppo_log');
    ele.setAttribute('style', 'position:fixed;left:0;top:0;z-index:9999;padding:4px;');
    document.body.appendChild(ele);
  }

  if (styles) {
    for (let style in styles) {
      if (Object.prototype.hasOwnProperty.call(styles, style)) {
        ele.style[style] = styles[style];
      }
    }
  }
  ele.innerHTML = msg;
}

/**
 * ppo.logs('onlyid&10', 1, 2);
 */
function logs() {
  if (window.console && window.console.log) {
    let onlyid = String(arguments[0]);
    let times = parseInt(onlyid.split('&')[1], 10) || 10;
    let logsCache = _cache.logs;

    if (!logsCache[onlyid]) logsCache[onlyid] = {};
    if (!logsCache[onlyid].once) logsCache[onlyid].once = 1;

    if (logsCache[onlyid].once <= times) {
      console.log.apply(console, args(arguments, 1));
      logsCache[onlyid].once++;
    }
  }
}

function removeConsole(clear) {
  try {
    if (!window.console) window.console = {};
    window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace = noop;
    if (clear === 'clear' && window.console.clear) window.console.clear();
  } catch (e) {}
}
/************************************************************************
 *
 *   Private Method
 *
 *************************************************************************/
let _cache = {
  urls: {},
  logs: {}
};

export { log, logs, removeConsole };
