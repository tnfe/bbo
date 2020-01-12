import ua from './ua';

/**
 * ie version
 * From https://codepen.io/gapcode/pen/vEJNZN
 * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
 * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
 * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
 * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
 */
export default function ieVersion() {
  let uakit = ua();
  let msie = uakit.indexOf('MSIE ');
  if (msie > 0) {
    return parseInt(uakit.substring(msie + 5, uakit.indexOf('.', msie)), 10);
  }

  let trident = uakit.indexOf('Trident/');
  if (trident > 0) {
    let rv = uakit.indexOf('rv:');
    return parseInt(uakit.substring(rv + 3, uakit.indexOf('.', rv)), 10);
  }

  let edge = uakit.indexOf('Edge/');
  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, uakit.indexOf('.', edge)), 10);
  }

  return '';
}
