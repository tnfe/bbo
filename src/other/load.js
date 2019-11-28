/* eslint-disable no-invalid-this */

import { hash } from '../other/index';
import { ua } from '../detecting/index';
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

function loadjs(url, b, c) {
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
/*
 * https://gist.github.com/pete-otaqui/3912307
 */
function loadcss(url, callback) {
  let promise;
  let resolutions = [];
  let rejections = [];
  let resolved = false;
  let rejected = false;
  let count;
  let id;

  this.count = this.count ? ++this.count : 1;
  count = this.count;
  id = 'load-css-' + count;

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

  let link = document.createElement('link');
  link.setAttribute('id', id);
  link.setAttribute('rel', 'stylesheet');
  link.setAttribute('type', 'text/css');
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
  link.setAttribute('href', url);
  return promise;
}

function loadImages(options) {
  let len = 0; // 资源总数
  let index = 0; // 循环资源数组用
  let curIndex = 0; // 记录当前加载完成资源个数
  let stepTimer = null; // 记录当前setTimeout对象句柄
  let stepTimeValue = 5; // 步进时间间隔
  let percentageValue = 0; // 当前百分比
  let targetPercent = 0; // 目标百分比
  let data = options.data || [];
  let step = options.step || function() {};
  let complete = options.complete || function() {};
  let needOneStep = options.needOneStep || false;
  let path = options.path || false;

  if (typeof data !== 'object' || data.length === 0) {
    step(100);
    return false;
  }

  len = data.length;
  if (path) {
    for (let i = len - 1; i > -1; i--) {
      data[i] = path + data[i];
      // console.info(data[i]);
    }
  }

  let processStep = function() {
    percentageValue++;
    // console.info("processStep = ",percentageValue)
    step(percentageValue);
    if (percentageValue < targetPercent) {
      stepTimer = setTimeout(function() {
        processStep();
      }, stepTimeValue);
    } else if (targetPercent === 100 && percentageValue === targetPercent) {
      if (complete && typeof complete === 'function') {
        complete();
      }
    }
  };

  function onload() {
    curIndex++;
    targetPercent = Math.floor((curIndex / len) * 100);
    if (needOneStep) {
      if (stepTimer) {
        clearTimeout(stepTimer);
      }
      processStep();
    } else {
      step(targetPercent);
      if (targetPercent === 100) {
        complete();
      }
    }
  }

  for (index; index < len; index++) {
    let strUrl = data[index];
    new LoadImageItem(strUrl, onload).start();
  }
}

/**
 * @name loadImageItem
 * @param  {string} url - images full url
 * @callback cb - called when load image completed
 */
function LoadImageItem(url, cb) {
  let self = this;

  self.img = new Image();

  // readyState为complete和loaded则表明图片已经加载完毕。测试IE6-IE10支持该事件，其它浏览器不支持。
  let onReadyStateChange = function() {
    removeEventHandlers();
    console.info('onReadyStateChange');
    cb(self, 'onReadyStateChange');
  };

  let onError = function() {
    console.info('onError');
    removeEventHandlers();
    cb(self, 'onError');
  };

  let onLoad = function() {
    removeEventHandlers();
    cb(self, 'onload');
  };

  let removeEventHandlers = function() {
    self.unbind('load', onLoad);
    self.unbind('readystatechange', onReadyStateChange);
    self.unbind('error', onError);
  };

  this.start = function() {
    this.bind('load', onLoad);
    this.bind('readystatechange', onReadyStateChange);
    this.bind('error', onError);

    this.img.src = url;
    if (self.img.complete) {
      removeEventHandlers();
      cb(this, 'onload');
    }
  };
}

/**
 * @name bind
 * @description cross-browser event binding
 * @param  {string} eventName
 * @param  {function} eventHandler
 */
LoadImageItem.prototype.bind = function(eventName, eventHandler) {
  if (this.img.addEventListener) {
    this.img.addEventListener(eventName, eventHandler, false);
  } else if (this.img.attachEvent) {
    this.img.attachEvent('on' + eventName, eventHandler);
  }
};

/**
 * @name unbind
 * @description cross-browser event un-binding
 * @param  {string} eventName
 * @param  {function} eventHandler
 */

LoadImageItem.prototype.unbind = function(eventName, eventHandler) {
  if (this.img.removeEventListener) {
    this.img.removeEventListener(eventName, eventHandler, false);
  } else if (this.img.detachEvent) {
    this.img.detachEvent('on' + eventName, eventHandler);
  }
};

export { loadImages, loadjs, loadcss };
