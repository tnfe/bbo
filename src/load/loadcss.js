/* eslint-disable no-invalid-this */

/*
 * https://gist.github.com/pete-otaqui/3912307
 */
import attr from '../bom/attr';
import c from '../bom/c';
import randomKey from '../random/random_key';

export default function loadcss(url, callback) {
  let promise;
  let resolutions = [];
  let rejections = [];
  let resolved = false;
  let rejected = false;
  let id;

  id = 'load-css-' + randomKey(5);
  promise = {
    done: function(callback) {
      resolutions.push(callback);
      if (resolved) callback();
      return promise;
    },
    fail: function(callback) {
      rejections.push(callback);
      if (rejected) callback();
      return promise;
    }
  };

  function resolve() {
    resolved = true;
    for (let i = 0, len = resolutions.length; i < len; i++) resolutions[i]();
  }

  function reject() {
    rejected = true;
    for (let i = 0, len = rejections.length; i < len; i++) rejections[i]();
  }

  let link = c('link');
  attr(link, 'id', id);
  attr(link, 'rel', 'stylesheet');
  attr(link, 'type', 'text/css');
  if (typeof link.addEventListener !== 'undefined') {
    link.addEventListener('load', resolve, false);
    link.addEventListener('error', reject, false);
  } else if (typeof link.attachEvent !== 'undefined') {
    link.attachEvent('onload', function() {
      // IE 8 gives us onload for both success and failure
      // and also readyState is always "completed", even
      // for failure.  The only way to see if a stylesheet
      // load failed from an external domain is to try and
      // access its cssText, and then catch the error
      // ... sweet :/
      let cur;
      let i = document.styleSheets.length;
      try {
        while (i--) {
          cur = document.styleSheets[i];
          if (cur.id === id) {
            resolve();
            return;
          }
        }
      } catch (e) {}
      if (!resolved) {
        reject();
      }
    });
  }
  document.getElementsByTagName('head')[0].appendChild(link);
  attr(link, 'href', url);
  return promise;
}
