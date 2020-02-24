/* eslint-disable no-invalid-this */

import hash from '../other/hash';
import ua from '../device/ua';

/**
 * load js
 * 1. bbo.loadjs("//your_url/a.js",func);
 * 2. bbo.loadjs("//your_url/a.js","only_id",func);
 */
let _cache = {
  urls: {},
  logs: {}
};

let _insertScripts = function(arr, callback) {
  for (let i = 0; i < arr.length; i++) {
    _insertScript(arr[i], loaded);
  }

  let _index = 0;

  function loaded() {
    _index++;
    if (_index >= arr.length) {
      callback && callback();
    }
  }
};

let _insertScript = function(src, callback) {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);
  script.setAttribute('charset', 'utf-8');
  document.getElementsByTagName('head')[0].appendChild(script);

  if (/msie/.test(ua('l'))) {
    script.onreadystatechange = function() {
      if (this.readyState === 'loaded' || this.readyState === 'complete') {
        callback();
      }
    };
  } else if (/gecko/.test(ua('l'))) {
    script.onload = function() {
      callback();
    };
  } else {
    setTimeout(function() {
      callback();
    }, 50);
  }
};

export default function loadjs(url, b, c) {
  let onlyId;
  let callback;

  if (typeof b === 'function') {
    onlyId = String(hash(String(url)));
    callback = b;
  } else if (typeof b === 'undefined') {
    onlyId = String(hash(String(url)));
    callback = null;
  } else {
    onlyId = String(b);
    callback = c;
  }

  if (_cache.urls[onlyId]) {
    callback && callback();
  } else {
    let func = typeof url === 'string' ? _insertScript : _insertScripts;
    func.call(this, url, function() {
      _cache.urls[onlyId] = true;
      callback && callback();
    });
  }
}
