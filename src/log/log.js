/************************************************************************
 * LOGS
 *************************************************************************/
/**
 * log on mobile html body
 */

export default function log(msg, styles) {
  let ele = document.getElementById('_bbo_log');
  if (ele === null) {
    ele = document.createElement('div');
    ele.setAttribute('id', '_bbo_log');
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
