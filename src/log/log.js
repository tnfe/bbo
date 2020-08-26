/************************************************************************
 * LOGS
 *************************************************************************/
/**
 * log on mobile html body
 */
import c from '../bom/c';
import g from '../bom/g';
import attr from '../bom/attr';

export default function log(msg, styles) {
  let ele = g('_bbo_log');
  if (ele === null) {
    ele = c('div');
    attr(ele, 'id', '_bbo_log');
    attr(ele, 'style', 'position:fixed;left:0;top:0;z-index:9999;padding:4px;');
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
