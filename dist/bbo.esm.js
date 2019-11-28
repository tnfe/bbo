
/*
 * bbo
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2019 tnfe
 * https://github.com/tnfe/bbo.git
 * version 1.0.1
 */

var version = "1.0.1";

function ua(lower) {
  return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
}
/**
 * detect IOS
 * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * more see:
 * https://github.com/madrobby/zepto/blob/master/src/detect.js#files
 */


function isIOS() {
  return /iPad|iPhone|iPod/.test(ua());
}

function isiPhone() {
  return /iPhone/.test(ua());
}

function isIPad() {
  return /iPad/.test(ua());
}
/**
 * detect Android
 * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
 */


function isAndroid() {
  return ua('l').indexOf('android') > -1;
}
/**
 * detect PC / Mobile
 * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
 */


function isMobile() {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua('l'));
}

function isPC() {
  return !isMobile();
}

function isWeixin() {
  return /MicroMessenger/i.test(ua('l')); // 微信
}

function isNewsApp(e) {
  return /qqnews/.test(ua()); // 腾讯新闻app
}

function mqqbrowser() {
  return /mqqbrowser\//.test(ua()); // QQ浏览器
}

function isQQ() {
  return /qq\//.test(ua()); // 手机QQ
}

function isTenvideo() {
  return /qqlivebrowser/.test(ua()); // 腾讯视频
}

function isIphoneXmodel() {
  // X XS, XS Max, XR
  const xSeriesConfig = [{
    devicePixelRatio: 3,
    width: 375,
    height: 812
  }, {
    devicePixelRatio: 3,
    width: 414,
    height: 896
  }, {
    devicePixelRatio: 2,
    width: 414,
    height: 896
  }];

  if (typeof window !== 'undefined' && window) {
    const {
      devicePixelRatio,
      screen
    } = window;
    const {
      width,
      height
    } = screen;
    return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
  }

  return false;
}

function isIE() {
  return ieVersion() > 0;
}
/**
 * ie version
 * From https://codepen.io/gapcode/pen/vEJNZN
 * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
 * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
 * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
 * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
 */


function ieVersion() {
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

/**
 * arguments to array
 */
function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}
/**
 * a trash object
 */


let trash = {
  clear: function () {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') delete trash[key];
    }
  },
  log: function () {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') console.log('ppo.trash:: ', key, trash[key]);
    }
  }
};

function noop() {}

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

/************************************************************************
 * Bom and Dom
 *************************************************************************/

/**
 * open new url dont not blocked by browser
 */
function open(href) {
  let id = '_ppo_open_proxy';
  let a = document.getElementById(id) || document.createElement('a');
  a.setAttribute('id', id);
  a.setAttribute('href', href);
  a.setAttribute('target', '_blank');
  a.style.display = 'none';
  if (!a.parentNode) document.body.appendChild(a);
  trigger(a, 'click', 'MouseEvents');
}

function stopPropagation(e) {
  let _e = e || window.event;

  if (_e.stopPropagation) {
    _e.stopPropagation(); // W3C

  } else {
    _e.cancelBubble = true; // IE
  }
}

function g(i) {
  return document.getElementById(i);
}

function gc(cn) {
  return document.getElementsByClassName(cn);
}

function c(t, cn, i, id) {
  let el = document.createElement(t); // t就是创建的标签

  if (cn) {
    el.setAttribute('class', cn); // 给t标签添加cn这个类
  }

  if (i) {
    el.innerHTML = i; // 把新建的标签t的html文本赋值给i
  }

  if (id) {
    el.setAttribute('id', id); // 给标签添加一个id
  }

  return el;
}
/**
 * trigger event
 * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
 */


function trigger(element, event, eventType) {
  if (document.createEventObject) {
    let e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  } else {
    let e = document.createEvent(eventType || 'HTMLEvents');
    e.initEvent(event, true, true);
    element.dispatchEvent(e);
  }
}

/************************************************************************
 * Other
 *************************************************************************/

/**
 * generate uuid
 * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
}
/**
 * string hash map
 * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */


function hash(str) {
  let _str = String(str);

  let hash = 0;
  let i;
  let chr;
  if (_str.length === 0) return hash;

  for (i = 0; i < _str.length; i++) {
    chr = _str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}
/**
 * map condition judge
 *  ppo.judge = ppo.judgment
 */


function judge(v, vals, strict) {
  if (!isTypeof(vals, 'array')) return false;

  for (let key in vals) {
    if (strict) {
      if (v === vals[key]) return true;
    } else {
      if (v === vals[key]) return true;
    }
  }

  return false;
}
/**
 * is typeof type
 */


function isTypeof(val, type) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type;
}

function getType(ele) {
  if (!ele) return undefined;

  if (window === document && document !== window) {
    return 'window';
  } else if (ele.nodeType === 9) {
    return 'document';
  } else if (ele.callee) {
    return 'arguments';
  } else if (isFinite(ele.length) && ele.item) {
    return 'nodeList';
  } else {
    let temp = Object.prototype.toString.call(ele);
    let reg = /\[object (.*)\]/;
    let arr = reg.exec(temp);
    return arr[1].toLowerCase();
  }
}

function construct() {
  let classs = arguments[0];
  return new (Function.prototype.bind.apply(classs, arguments))();
}
/**
 * Gets all the formal parameter names of a function
 * https://www.zhihu.com/question/28912825
 */


function paramsName(fn) {
  return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
}

/* eslint-disable no-invalid-this */
/**
 * load js
 * 1. ppo.loadjs("//your_url/a.js",func);
 * 2. ppo.loadjs("//your_url/a.js","only_id",func);
 */

let _cache$1 = {
  urls: {},
  logs: {}
};

let _insertScripts = function (arr, callback) {
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

let _insertScript = function (src, callback) {
  let script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', src);
  document.getElementsByTagName('head')[0].appendChild(script);

  if (/msie/.test(ua('l'))) {
    script.onreadystatechange = function () {
      if (this.readyState === 'loaded' || this.readyState === 'complete') {
        callback();
      }
    };
  } else if (/gecko/.test(ua('l'))) {
    script.onload = function () {
      callback();
    };
  } else {
    setTimeout(function () {
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

  if (_cache$1.urls[onlyId]) {
    callback && callback();
  } else {
    let func = typeof url === 'string' ? _insertScript : _insertScripts;
    func.call(this, url, function () {
      _cache$1.urls[onlyId] = true;
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
    done: function (callback) {
      resolutions.push(callback);
      if (resolved) callback();
      return promise;
    },
    fail: function (callback) {
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
    link.attachEvent('onload', function () {
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

  let step = options.step || function () {};

  let complete = options.complete || function () {};

  let needOneStep = options.needOneStep || false;
  let path = options.path || false;

  if (typeof data !== 'object' || data.length === 0) {
    step(100);
    return false;
  }

  len = data.length;

  if (path) {
    for (let i = len - 1; i > -1; i--) {
      data[i] = path + data[i]; // console.info(data[i]);
    }
  }

  let processStep = function () {
    percentageValue++; // console.info("processStep = ",percentageValue)

    step(percentageValue);

    if (percentageValue < targetPercent) {
      stepTimer = setTimeout(function () {
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
    targetPercent = Math.floor(curIndex / len * 100);

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
  self.img = new Image(); // readyState为complete和loaded则表明图片已经加载完毕。测试IE6-IE10支持该事件，其它浏览器不支持。

  let onReadyStateChange = function () {
    removeEventHandlers();
    console.info('onReadyStateChange');
    cb(self, 'onReadyStateChange');
  };

  let onError = function () {
    console.info('onError');
    removeEventHandlers();
    cb(self, 'onError');
  };

  let onLoad = function () {
    removeEventHandlers();
    cb(self, 'onload');
  };

  let removeEventHandlers = function () {
    self.unbind('load', onLoad);
    self.unbind('readystatechange', onReadyStateChange);
    self.unbind('error', onError);
  };

  this.start = function () {
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


LoadImageItem.prototype.bind = function (eventName, eventHandler) {
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


LoadImageItem.prototype.unbind = function (eventName, eventHandler) {
  if (this.img.removeEventListener) {
    this.img.removeEventListener(eventName, eventHandler, false);
  } else if (this.img.detachEvent) {
    this.img.detachEvent('on' + eventName, eventHandler);
  }
};

/**
 * to json
 */
// 计算表达式的值 hack

function evil(fn) {
  let Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错

  return new Fn('return ' + fn)();
}

function toJson(res) {
  if (!res) return null;

  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      return evil('(' + res + ')');
    }
  } else if (isTypeof(res.json, 'function')) {
    return res.json();
  } else {
    return res;
  }
}

/**
 * cookie
 * https://github.com/jiayi2/onavo/blob/master/onavo.js#L209
 */
function cookie() {
  function _extend() {
    let i = 0;
    let result = {};

    for (; i < arguments.length; i++) {
      let attributes = arguments[i];

      for (let key in attributes) {
        if (Object.prototype.hasOwnProperty.call(key, attributes)) {
          result[key] = attributes[key];
        }
      }
    }

    return result;
  }

  function init(converter) {
    // #lizard forgives
    function api(key, value, attributes) {
      let result;

      if (typeof document === 'undefined') {
        return;
      }

      if (arguments.length > 1) {
        let _attributes = _extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof _attributes.expires === 'number') {
          let expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + _attributes.expires * 864e5);
          _attributes.expires = expires;
        }

        let _value = value;

        try {
          result = JSON.stringify(_value);

          if (/^[\{\[]/.test(result)) {
            _value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          _value = encodeURIComponent(String(_value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
        } else {
          _value = converter.write(_value, key);
        }

        let _key = encodeURIComponent(String(key));

        let __key = _key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);

        let ___key = __key.replace(/[\(\)]/g, escape);

        let _cookie = document.cookie = [___key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');

        return _cookie;
      }

      if (!key) {
        result = {};
      }

      let cookies = document.cookie ? document.cookie.split('; ') : [];
      let rdecode = /(%[0-9A-Z]{2})+/g;
      let i = 0;

      for (; i < cookies.length; i++) {
        let parts = cookies[i].split('=');
        let cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          let name = parts[0].replace(rdecode, decodeURIComponent);
          cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

          try {
            cookie = JSON.parse(cookie);
          } catch (e) {
            console.log(e);
          }

          if (key === name) {
            result = cookie;
            break;
          }

          if (!key) {
            result[name] = cookie;
          }
        } catch (e) {}
      }

      return result;
    }

    api.set = api;

    api.get = function (key) {
      return api.call(api, key);
    };

    api.getJSON = api.getjson = api.getJson = function () {
      return api.apply({
        json: true
      }, [].slice.call(arguments));
    };

    api.defaults = {};

    api.remove = function (key, attributes) {
      api(key, '', _extend(attributes, {
        expires: -1
      }));
    };

    api.withConverter = init;
    return api;
  }

  return init(function () {});
}
/************************************************************************
 * Cookies
 *************************************************************************/

/**
 * setCookie / getCookie / deleteCookie
 * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
 * change by a-jie
 */


function setCookie(name, value, option) {
  let longTime = 10; // let path = '; path=/';

  let val = option && option.raw ? value : encodeURIComponent(value);
  let cookie = encodeURIComponent(name) + '=' + val;

  if (option) {
    if (option.days) {
      let date = new Date();
      let ms = option.days * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += '; expires=' + date.toGMTString();
    } else if (option.hour) {
      let date = new Date();
      let ms = option.hour * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += '; expires=' + date.toGMTString();
    } else {
      let date = new Date();
      let ms = longTime * 365 * 24 * 3600 * 1000;
      date.setTime(date.getTime() + ms);
      cookie += '; expires=' + date.toGMTString();
    }

    if (option.path) cookie += '; path=' + option.path;
    if (option.domain) cookie += '; domain=' + option.domain;
    if (option.secure) cookie += '; true';
  }

  document.cookie = cookie;
}

function getCookie(name) {
  let nameEQ = encodeURIComponent(name) + '=';
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === ' ') c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }

  return null;
} // ppo.deleteCookie = ppo.delCookie =


function deleteCookie(name) {
  setCookie(name, '', {
    hour: -1
  });
}

/************************************************************************
 * About Url Params
 *************************************************************************/

/**
 * getUrlParam / deleteUrlParam
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
function getUrlParam(name, url) {
  let _url = url;

  if (!_url) {
    _url = window.location.href;
  }

  let _name = name.replace(/[\[\]]/g, '\\$&');

  let regex = new RegExp('[?&]' + _name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(_url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}
/**
 * setUrlParam
 * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
 */


function setUrlParam(key, value, url) {
  let _url = url;

  if (!_url) {
    _url = window.location.href;
  }

  let re = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');

  if (_url.match(re)) {
    return _url.replace(re, '$1' + key + '=' + encodeURIComponent(value) + '$2');
  } else {
    let hash = '';

    if (_url.indexOf('#') !== -1) {
      hash = _url.replace(/.*#/, '#');
      _url = _url.replace(/#.*/, '');
    }

    let separator = _url.indexOf('?') !== -1 ? '&' : '?';
    return _url + separator + key + '=' + encodeURIComponent(value) + hash;
  }
} // ppo.deleteUrlParam = ppo.delUrlParam


function deleteUrlParam(param, url) {
  let _url = url;

  if (!_url) {
    _url = window.location.href;
  } // prefer to use l.search if you have a location/link object


  let urlparts = _url.split('?');

  if (urlparts.length >= 2) {
    let prefix = encodeURIComponent(param) + '=';
    let pars = urlparts[1].split(/[&;]/g); // reverse iteration as may be destructive

    for (let i = pars.length; i-- > 0;) {
      // idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    _url = urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    return _url;
  } else {
    return _url;
  }
}

function objectParam(arr) {
  let str = '';

  if (Array.isArray(arr)) {
    str = arr.map(function (item) {
      return item.name + '=' + item.value;
    }).join('&');
  } else {
    str = objectParam(objectBigParam(arr));
  }

  return str;
}

function objectBigParam(obj) {
  let arr = [];
  Object.keys(obj).forEach(function (k) {
    if (Array.isArray(obj[k])) {
      arr = arr.concat(obj[k].map(function (v) {
        return {
          name: k,
          value: v
        };
      }));
    } else {
      arr.push({
        name: k,
        value: obj[k]
      });
    }
  });
  return arr;
}

function fill0(num) {
  let _num = parseFloat(num);

  return _num < 10 ? '0' + _num : _num;
}

/**
 * setInterval func fix times
 * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
 */

function setTimesout() {
  let func = arguments[0];
  let delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
  let times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);

  let _args = arguments.length > 3 ? args(arguments, 3) : null;

  let target = {
    index: 0,
    times: times,
    over: false
  };
  let id = setInterval(function () {
    target.index++;

    if (target.index > times) {
      clearInterval(id);
    } else {
      if (target.index === times) target.over = true;
      func.apply(target, _args);
    }
  }, delay);
  return id;
}

function clearTimesout(id) {
  clearInterval(id);
}
/************************************************************************
 * Date
 *************************************************************************/

/**
 * getDate
 * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
 */


function getDate(d1, d2) {
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let hh = today.getHours();
  let ms = today.getMinutes();
  let ss = today.getSeconds();
  dd = fill0(dd);
  mm = fill0(mm);
  hh = fill0(hh);
  ms = fill0(ms);
  ss = fill0(ss);

  let _d1 = d1 || '/';

  let _d2 = d2 || ':';

  return yyyy + _d1 + mm + _d1 + dd + ' ' + hh + _d2 + ms + _d2 + ss;
}
/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */


function formatPassTime(startTime) {
  let currentTime = Date.parse(new Date());
  let time = currentTime - startTime;
  let day = parseInt(time / (1000 * 60 * 60 * 24), 10);
  let hour = parseInt(time / (1000 * 60 * 60), 10);
  let min = parseInt(time / (1000 * 60), 10);
  let month = parseInt(day / 30, 10);
  let year = parseInt(month / 12, 10);
  if (year) return year + '年前';
  if (month) return month + '个月前';
  if (day) return day + '天前';
  if (hour) return hour + '小时前';
  if (min) return min + '分钟前';else return '刚刚';
}
/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */


function formatRemainTime(endTime) {
  let startDate = new Date(); // 开始时间

  let endDate = new Date(endTime); // 结束时间

  let t = endDate.getTime() - startDate.getTime(); // 时间差

  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
}

/************************************************************************
 * Random And Math
 *************************************************************************/
function randomColor() {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
} // ppo.randomFromArray = ppo.randomfArr


function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
} // ppo.randomFromA2B = ppo.randomA2B


function randomA2B(a, b, int) {
  let result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
}

function randomKey(length) {
  let key = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  let _length = length || 6;

  for (let i = 0; i < _length; i++) key += possible.charAt(Math.floor(Math.random() * possible._length));

  return key;
}

function floor(n, m) {
  let _m = m || 0;

  return Math.floor(n * Math.pow(10, _m)) / Math.pow(10, _m);
}

/************************************************************************
 * Mobile
 *************************************************************************/

/**
 * lock touch in mobile phone
 */
function lockTouch() {
  document.addEventListener('touchmove', function (e) {
    e.preventDefault();
  }, !1);
  document.addEventListener('touchstart', preventDefault, !1);
  document.addEventListener('touchend', preventDefault, !1);

  function not(e, tag) {
    return e.target.tagName !== tag.toUpperCase() && e.target.tagName !== tag.toLowerCase();
  }

  function preventDefault(e) {
    if (not(e, 'input') && not(e, 'textarea') && not(e, 'select') && not(e, 'menus')) e.preventDefault();
  }
}

/**
 * 图片尺寸检查
 * @param {(Object|String)} image - 图片信息，支持 File 对象 或 Data URLs
 * @param {Object} [options={}] - 检查参数
 * @param {Number} [options.width] - 检查宽度
 * @param {Number} [options.height] - 检查高度
 * @param {Number} [deviation=0] - 允许的偏差量
 */
function checkImageSize(image, options, deviation = 0) {
  return new Promise((resolve, reject) => {
    /* #region 判断图片信息类型 */
    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = function () {
        checkSize(this.result);
      };

      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      checkSize(image);
    }
    /* #endregion */

    /**
     * 检测图片尺寸
     * @param {String} data - 图片数据：Data URL
     */


    function checkSize(data) {
      const virtualImage = new Image();
      virtualImage.src = data;

      virtualImage.onload = function () {
        let width = this.naturalWidth;
        let height = this.naturalHeight;

        if (options.width && Math.abs(options.width - width) > deviation) {
          resolve(false);
        }

        if (options.height && Math.abs(options.height - height) > deviation) {
          resolve(false);
        }

        resolve(true);
      };
    }
    /* #endregion */

  });
}
/**
 * 图片优化，暂不支持 gif 图片
 * @param {(Object|String)} image - 图片信息，支持 File 对象 或 Data URLs
 * @param {Number} [quality=0.9] - 输出图片质量，0 - 1 之间，仅 image/jpeg 与 image/webp 有效
 * @param {Object} [options={}] - 输出图片相关选项
 * @param {Number} [options.maxWidth=1920] - 输出图片的最大宽度，若图片原始宽度小于该宽度，则返回原始尺寸图片，若图片原始宽度大于该宽度，则返回等比缩放为该尺寸的图片
 * @param {String} [options.mimeType] - 输出图片格式，MIME 类型
 * @returns {Object} Promise 对象，resolve 函数参数为优化后的图片 Blob 对象，如果输出类型为 image/gif，则原样返回 image 参数内容
 */


function imageOptimization(image, quality = 0.9, {
  maxWidth = 1920,
  mimeType
} = {}) {
  return new Promise((resolve, reject) => {
    /* #region 判断图片信息类型 */
    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = function () {
        toBlob(this.result);
      };

      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      toBlob(image);
    }
    /* #endregion */

    /**
     * 转换为 Blob 类型
     * @param {String} data - 图片数据：Data URL
     */


    function toBlob(data) {
      const type = data.match(/data:([^;,]+)/);

      if (Array.isArray(type)) {
        const outputType = mimeType ? mimeType : type[1]; // 暂不支持 gif 图片，原样返回 image 参数内容

        if (outputType === 'image/gif') {
          return resolve(image);
        }

        const virtualImage = new Image();
        virtualImage.src = data;

        virtualImage.onload = function () {
          let width = this.naturalWidth;
          let height = this.naturalHeight;

          if (width > maxWidth) {
            height = Math.round(maxWidth * height / width);
            width = maxWidth;
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const context = canvas.getContext('2d');
          context.drawImage(this, 0, 0, width, height);
          canvas.toBlob(blob => {
            resolve(blob);
          }, mimeType ? mimeType : type[1], quality);
        };
      } else {
        reject(new Error('[Slug Function] 非图片类型的 Data URLs'));
      }
    }
  });
}

/* eslint-disable */

/**
 *  lodash简易实现，与lodash接口保持一致。
 *  为精简代码体积，函数参数只实现基础校验，稳定性低于lodash
 *
 */
function getTag(src) {
  return Object.prototype.toString.call(src);
}

function hasOwnProperty(obj, keyName) {
  return Object.prototype.hasOwnProperty.call(obj, keyName);
}

function isObject(obj) {
  return getTag(obj) === '[object Object]';
}

function isArray(arr) {
  return getTag(arr) === '[object Array]';
}

function isString(str) {
  return getTag(str) === '[object String]';
}

function isBoolean(bool) {
  return getTag(bool) === '[object Boolean]';
}

function isNumber(number) {
  return getTag(number) === '[object Number]';
}

function isMap(map) {
  return getTag(map) === '[object Map]';
}

function isSet(set) {
  return getTag(set) === '[object Set]';
}

function isFunction(func) {
  return getTag(func) === '[object Function]';
}

function isEmpty(value) {
  if (value == null) {
    return true;
  }

  if (isArray(value) || isString(value)) {
    return value.length === 0;
  }

  if (isObject(value)) {
    return Object.keys(value).length === 0;
  }

  if (isMap(value) || isSet(value)) {
    return value.size === 0;
  }

  return true;
}

function is(x, y) {
  // inlined Object.is polyfill to avoid requiring consumers ship their own
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
  if (x === y) {
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Added the nonzero y check to make Flow happy, but it is redundant
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    // Step 6.a: NaN == NaN
    return x !== x && y !== y;
  }
}

function isShallowEqual(objA, objB) {
  if (is(objA, objB)) {
    return true;
  }

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) {
    return false;
  }

  let i = 0;

  while (i < keysA.length) {
    if (!hasOwnProperty(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }

    i += 1;
  }

  return true;
}

function has(obj, keyName) {
  return obj !== null && obj !== undefined && hasOwnProperty(obj, keyName);
}

function reduce(src, func) {
  let i = 0;
  let acc = arguments[2];

  if (isArray(src)) {
    if (arguments.length !== 3) {
      acc = src[0];
    }

    while (i < src.length) {
      acc = func(acc, src[i], i, src);
      i += 1;
    }

    return acc;
  } else if (isObject(src)) {
    const keys = Object.keys(src);

    if (arguments.length !== 3) {
      acc = src[keys[0]];
    }

    while (i < keys.length) {
      const key = keys[i];
      acc = func(acc, src[key], key, src);
      i += 1;
    }

    return acc;
  }

  return acc;
}

function forEach(src, func) {
  let i = 0;

  if (isArray(src)) {
    while (i < src.length) {
      const rst = func(src[i], i, src);

      if (rst === false) {
        break;
      }

      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);

    while (i < keys.length) {
      const key = keys[i];
      const rst = func(src[key], key, src);

      if (rst === false) {
        break;
      }

      i += 1;
    }
  }
}

function map(src, func) {
  const rst = [];
  let i = 0;

  if (isArray(src)) {
    while (i < src.length) {
      rst.push(func(src[i], i, src));
      i += 1;
    }
  } else if (isObject(src)) {
    const keys = Object.keys(src);

    while (i < keys.length) {
      const key = keys[i];
      rst.push(func(src[key], key, src));
      i += 1;
    }
  }

  return rst;
}

function findIndex(src, func) {
  let rst = -1;
  forEach(src, (item, index, obj) => {
    if (isFunction(func)) {
      if (func(item, index, obj) === true) {
        rst = index;
        return false;
      }
    } else {
      if (isShallowEqual(item, func)) {
        rst = index;
        return false;
      }
    }
  });
  return rst;
}

function find(src, func) {
  let rst = undefined;
  forEach(src, (item, key, obj) => {
    if (isFunction(func)) {
      if (func(item, key, obj) === true) {
        rst = item;
        return false;
      }
    } else {
      if (isShallowEqual(item, func)) {
        rst = item;
        return false;
      }
    }
  });
  return rst;
}

const charCodeOfDot = '.'.charCodeAt(0);
const reEscapeChar = /\\(\\)?/g; // const rePropName = RegExp(
//   // Match anything that isn't a dot or bracket.
//   '[^.[\\]]+' + '|' +
//   // Or match property names within brackets.
//   '\\[(?:' +
//     // Match a non-string expression.
//     '([^"\'][^[]*)' + '|' +
//     // Or match strings (supports escaping characters).
//     '(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2' +
//   ')\\]'+ '|' +
//   // Or match "" as the space between consecutive dots or empty brackets.
//   '(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))'
// , 'g')

const rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

function stringToPath(string) {
  const result = [];

  if (string.charCodeAt(0) === charCodeOfDot) {
    result.push('');
  }

  string.replace(rePropName, (match, expression, quote, subString) => {
    let key = match;

    if (quote) {
      key = subString.replace(reEscapeChar, '$1');
    } else if (expression) {
      key = expression.trim();
    }

    result.push(key);
  });
  return result;
}

function toPath(value) {
  if (!isString(value)) {
    return [];
  }

  return stringToPath(value);
}

function get(object, path, defaultValue) {
  if (object == null) {
    return defaultValue;
  }

  if (!Array.isArray(path)) {
    const reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    const reIsPlainProp = /^\w*$/;

    const isKey = function (value, object) {
      const type = typeof value;

      if (type == 'number' || type == 'boolean' || value == null) {
        return true;
      }

      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    };

    if (isKey(path, object)) {
      path = [path];
    } else {
      path = stringToPath(path);
    }
  }

  let index = 0;
  const length = path.length;

  while (object != null && index < length) {
    object = object[path[index]];
    index += 1;
  }

  if (index && index === length) {
    return object === undefined ? defaultValue : object;
  } else {
    return defaultValue;
  }
}

function debounce(func, wait, options) {
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;
  let lastInvokeTime = 0;
  let leading = false;
  let maxing = false;
  let trailing = true; // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.

  const useRAF = !wait && wait !== 0 && typeof requestAnimationFrame === 'function';

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  wait = +wait || 0;

  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;
    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      cancelAnimationFrame(timerId);
      return requestAnimationFrame(pendingFunc);
    }

    return setTimeout(pendingFunc, wait);
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time; // Start the timer for the trailing edge.

    timerId = startTimer(timerExpired, wait); // Invoke the leading edge.

    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;
    return maxing ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke) : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime; // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.

    return lastCallTime === undefined || timeSinceLastCall >= wait || timeSinceLastCall < 0 || maxing && timeSinceLastInvoke >= maxWait;
  }

  function timerExpired() {
    const time = Date.now();

    if (shouldInvoke(time)) {
      return trailingEdge(time);
    } // Restart the timer.


    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined; // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.

    if (trailing && lastArgs) {
      return invokeFunc(time);
    }

    lastArgs = lastThis = undefined;
    return result;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);
    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }

      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }

    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }

    return result;
  }

  return debounced;
}

function throttle(func, wait, options) {
  let leading = true;
  let trailing = true;

  if (typeof func !== 'function') {
    throw new TypeError('Expected a function');
  }

  if (isObject(options)) {
    leading = 'leading' in options ? !!options.leading : leading;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  return debounce(func, wait, {
    leading,
    trailing,
    maxWait: wait
  });
} // 只能pick第一级key且浅拷贝object


function pick(object, ...paths) {
  if (object === null || object === undefined) {
    return {};
  }

  return reduce(paths, (rst, path) => {
    if (isArray(path)) {
      forEach(path, item => {
        if (has(object, item)) {
          rst[item] = object[item];
        }
      });
    } else {
      if (has(object, path)) {
        rst[path] = object[path];
      }
    }

    return rst;
  }, {});
} // 只能omit第一级key且浅拷贝object


function omit(object, ...paths) {
  if (object === null || object === undefined) {
    return {};
  }

  const rst = Object.assign({}, object);
  const set = forEach(paths, path => {
    if (isArray(path)) {
      forEach(path, item => {
        if (isString(item) || isNumber(item)) {
          delete rst[item];
        }
      });
    } else if (isString(path) || isNumber(path)) {
      delete rst[path];
    }
  });
  return rst;
}

/**
 * Main entry
 */

let bbo = {
  // version
  version,
  // detecting
  ua,
  isIOS,
  isIos: isIOS,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  mqqbrowser,
  // log
  log,
  logs,
  removeConsole,
  // arguments
  args,
  trash,
  noop,
  // bom
  open,
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  // other
  uuid,
  hash,
  judge,
  getType,
  isTypeof,
  construct,
  paramsName,
  // other function
  loadImages,
  loadjs,
  loadcss,
  toJson,
  // cookie
  cookie,
  setCookie,
  getCookie,
  deleteCookie,
  // url
  getUrlParam,
  setUrlParam,
  deleteUrlParam,
  objectParam,
  // times
  setTimesout,
  clearTimesout,
  getDate,
  formatPassTime,
  formatRemainTime,
  // fill
  fill0,
  // random
  randomColor,
  randomFromArray,
  randomA2B,
  randomKey,
  floor,
  // touch
  lockTouch,
  // image
  checkImageSize,
  imageOptimization,
  // lodash
  getTag,
  hasOwnProperty,
  isObject,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isMap,
  isSet,
  isFunction,
  isEmpty,
  isShallowEqual,
  has,
  reduce,
  forEach,
  map,
  findIndex,
  find,
  toPath,
  get,
  debounce,
  throttle,
  pick,
  omit
};

export default bbo;
