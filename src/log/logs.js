import args from '../args/args';
/************************************************************************
 *   Private Method
 *************************************************************************/
let _cache = {
  urls: {},
  logs: {}
};
/**
 * bbo.logs('only id&10', 1, 2);
 */
export default function logs() {
  if (window.console && window.console.log) {
    let onlyId = String(arguments[0]);
    let times = parseInt(onlyId.split('&')[1], 10) || 10;
    let logsCache = _cache.logs;

    if (!logsCache[onlyId]) logsCache[onlyId] = {};
    if (!logsCache[onlyId].once) logsCache[onlyId].once = 1;

    if (logsCache[onlyId].once <= times) {
      console.log.apply(console, args(arguments, 1));
      logsCache[onlyId].once++;
    }
  }
}
