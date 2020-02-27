/* eslint-disable no-invalid-this */

import hash from '../other/hash';
import ua from '../device/ua';
import attr from '../bom/attr';
import c from '../bom/c';
import isFunction from '../lodash/is_function';
import isString from '../lodash/is_string';

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
  let script = c('script');
  attr(script, 'type', 'text/javascript');
  attr(script, 'src', src);
  attr(script, 'charset', 'utf-8');
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

  if (isFunction(b)) {
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
    let func = isString(url) ? _insertScript : _insertScripts;
    func.call(this, url, function() {
      _cache.urls[onlyId] = true;
      callback && callback();
    });
  }
}
