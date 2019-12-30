
/*
 * bbo
 * +++++++++ A utility belt library for modern JavaScript. +++++++++
 * (c) 2011-2019 tnfe
 * https://github.com/tnfe/bbo.git
 * version 1.0.8
 */

var version = "1.0.8";

const ua = lower => {
  return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
};
/**
 * detect IOS
 * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * more see:
 * https://github.com/madrobby/zepto/blob/master/src/detect.js#files
 */


const isIOS = () => {
  return /iPad|iPhone|iPod/.test(ua());
};

const isiPhone = () => {
  return /iPhone/.test(ua());
};

const isIPad = () => {
  return /iPad/.test(ua());
};
/**
 * detect Android
 * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
 */


const isAndroid = () => {
  return ua('l').indexOf('android') > -1;
};
/**
 * detect PC / Mobile
 * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
 */


const isMobile = () => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua('l'));
};

const isPC = () => {
  return !isMobile();
};

const isWeixin = () => {
  return /MicroMessenger/i.test(ua('l')); // 微信
};

const isNewsApp = () => {
  return /qqnews/.test(ua()); // 腾讯新闻app
};

const mqqbrowser = () => {
  return /mqqbrowser\//.test(ua()); // QQ浏览器
};

const isQQ = () => {
  return /qq\//.test(ua()); // 手机QQ
};

const isTenvideo = () => {
  return /qqlivebrowser/.test(ua()); // 腾讯视频
};

const isIphoneXmodel = () => {
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
};

const isIE = () => {
  return ieVersion() > 0;
};
/**
 * ie version
 * From https://codepen.io/gapcode/pen/vEJNZN
 * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
 * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
 * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
 * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
 */


const ieVersion = () => {
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
};

/**
 * arguments to array
 */
function args($arguments, first) {
  return Array.prototype.slice.call($arguments, first || 0);
}
/**
 * a trash object
 */


const trash = {
  clear: function () {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') delete trash[key];
    }
  },
  log: function () {
    for (let key in trash) {
      if (key !== 'log' && key !== 'clear') console.log('bbo.trash:: ', key, trash[key]);
    }
  }
};

const noop = () => {};

const merge = (...objs) => [...objs].reduce((acc, obj) => Object.keys(obj).reduce((a, k) => {
  acc[k] = acc.hasOwnProperty(k) ? [].concat(acc[k]).concat(obj[k]) : obj[k];
  return acc;
}, {}), {});

const over = (...fns) => (...args) => fns.map(fn => fn.apply(null, args));

const call = (key, ...args) => context => context[key](...args);

/************************************************************************
 * LOGS
 *************************************************************************/

/**
 * log on mobile html body
 */

function log(msg, styles) {
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
/**
 * bbo.logs('only id&10', 1, 2);
 */


function logs() {
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

function removeConsole(clear) {
  try {
    if (!window.console) window.console = {};
    window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace = noop;
    if (clear === 'clear' && window.console.clear) window.console.clear();
  } catch (e) {}
}
/************************************************************************
 *   Private Method
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
const open = href => {
  let id = '_bbo_open_proxy';
  let a = g(id) || c('a', id, '', id);
  setStyle(a, 'display', 'none');
  attr(a, 'href', href);
  attr(a, 'target', '_blank');
  if (!a.parentNode) document.body.appendChild(a);
  trigger(a, 'click', 'MouseEvents');
};
/**
 * trigger event
 * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
 */


const trigger = (element, event, eventType) => {
  if (document.createEventObject) {
    let e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  } else {
    let e = document.createEvent(eventType || 'HTMLEvents');
    e.initEvent(event, true, true);
    element.dispatchEvent(e);
  }
};

const stopPropagation = e => {
  let _e = e || window.event;

  if (_e.stopPropagation) {
    _e.stopPropagation(); // W3C

  } else {
    _e.cancelBubble = true; // IE
  }
};

const g = i => {
  return document.getElementById(i);
};

const gc = cn => {
  return document.getElementsByClassName(cn);
};

const c = (t, cn, i, id) => {
  let el = document.createElement(t);

  if (cn) {
    attr(el, 'class', cn);
  }

  if (i) {
    el.innerHTML = i;
  }

  if (id) {
    attr(el, 'id', id);
  }

  return el;
};

const query = i => {
  return document.querySelector(i);
};

const copyToClipboard = str => {
  const el = document.createElement('textarea');
  el.value = str;
  attr(el, 'readonly', '');
  setStyle(el, 'position', 'absolute');
  setStyle(el, 'left', '-9999px');
  document.body.appendChild(el);
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const show = (...el) => [...el].forEach(e => {
  e.style.display = '';
});

const hide = (...el) => [...el].forEach(e => {
  e.style.display = 'none';
});

const elementContains = (parent, child) => parent !== child && parent.contains(child);

const formToObject = form => Array.from(new FormData(form)).reduce((acc, [key, value]) => ({ ...acc,
  [key]: value
}), {});

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

const setStyle = (el, ruleName, val) => {
  el.style[ruleName] = val;
};

const attr = (el, ruleName, val) => {
  el.setAttribute(ruleName, val);
};

/************************************************************************
 * Other
 *************************************************************************/

/**
 * generate uuid
 * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
const uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    let r = Math.random() * 16 | 0;
    let v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/**
 * string hash map
 * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */


const hash = str => {
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
};
/**
 * map condition judge
 *  bbo.judge = bbo.judgment
 */


const judge = (v, vals, strict) => {
  if (!isTypeof(vals, 'array')) return false;

  for (let key in vals) {
    if (strict) {
      if (v === vals[key]) return true;
    } else {
      if (v === vals[key]) return true;
    }
  }

  return false;
};
/**
 * is typeof type
 */


const isTypeof = (val, type) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type;
};

const getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

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
 * 1. bbo.loadjs("//your_url/a.js",func);
 * 2. bbo.loadjs("//your_url/a.js","only_id",func);
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
  let len = 0;
  let index = 0;
  let curIndex = 0;
  let stepTimer = null;
  let stepTimeValue = 5;
  let percentageValue = 0;
  let targetPercent = 0;
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
  self.img = new Image(); // readyState:'complete' or 'loaded' => image has been loaded。
  // for IE6-IE10。

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
// eval hack

const evil = fn => {
  // A variable points to Function, preventing reporting errors
  let Fn = Function;
  return new Fn('return ' + fn)();
}; // bbo.toJSON = bbo.tojson = bbo.toJson


const toJson = res => {
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
};

/**
 * cookie
 * https://github.com/jiayi2/onavo/blob/master/onavo.js#L209
 */
const cookie = () => {
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
      let setDecode = /(%[0-9A-Z]{2})+/g;
      let i = 0;

      for (; i < cookies.length; i++) {
        let parts = cookies[i].split('=');
        let cookie = parts.slice(1).join('=');

        if (cookie.charAt(0) === '"') {
          cookie = cookie.slice(1, -1);
        }

        try {
          let name = parts[0].replace(setDecode, decodeURIComponent);
          cookie = converter.read ? converter.read(cookie, name) : converter(cookie, name) || cookie.replace(setDecode, decodeURIComponent);

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
};
/************************************************************************
 * Cookies
 *************************************************************************/

/**
 * setCookie / getCookie / deleteCookie
 * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
 * change by a-jie
 */


const setCookie = (name, value, option) => {
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
};

const getCookie = name => {
  let nameEQ = encodeURIComponent(name) + '=';
  let ca = document.cookie.split(';');

  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];

    while (c.charAt(0) === ' ') c = c.substring(1, c.length);

    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }

  return null;
}; // bbo.deleteCookie = bbo.delCookie =


const deleteCookie = name => {
  setCookie(name, '', {
    hour: -1
  });
};

const parseCookie = str => str.split(';').map(v => v.split('=')).reduce((acc, v) => {
  acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
  return acc;
}, {});

/**
 * String
 */
const string = {
  /**
   * Remove spaces after removing previous string
   */
  trim: str => {
    let _str = str.replace(/^\s+/, '');

    for (let i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        _str = str.slice(0, i + 1);
        break;
      }
    }

    return _str;
  },

  /**
   * Increase by 0 based on string length before string
   */
  fillZero: (target, n) => {
    let z = new Array(n).join('0');
    let str = z + target;
    let result = str.slice(-n);
    return result;
  },

  /**
   * Long string unique
   */
  longUnique: target => {
    let json = {};

    for (let index = 0; index < target.length; index++) {
      if (!json[target[index]]) {
        json[target[index]] = -1;
      }
    }

    let longString = '';

    for (let index = 0; index < target.length; index++) {
      if (json[target[index]]) {
        json[target[index]] = 0;
        longString = longString + target[index];
      }
    }

    return longString;
  },

  /**
   * Remove the html tags inside the script
   */
  stripTags: target => {
    return target.replace(/<script[^>]*>(\S\s*?)<\/script>/gim, '').replace(/<[^>]+>/g, '');
  },

  /**
   * Capitalizes the first letter of a string.
   */
  capitalize: target => {
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  },

  /**
   * DeCapitalizes the first letter of a string.
   */
  deCapitalize: ([first, ...rest], upperRest = false) => first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join('')),

  /**
   * en:Returns true if the given string is an absolute URL, false otherwise.
   */
  isAbsoluteURL: str => /^[a-z][a-z0-9+.-]*:/.test(str),

  /**
   * Creates a new string with the results of calling a provided function
   * on every character in the calling string.
   */
  mapString: (str, fn) => str.split('').map((c, i) => fn(c, i, str)).join(''),

  /**
   * Replaces all but the last num of characters with the specified mask character.
   */
  mask: (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask),

  /**
   * splitLines('This\nis a\nmultiline\nstring.\n') =>
   * ['This', 'is a', 'multiline', 'string.' , '']
   */
  splitLines: str => str.split(/\r?\n/),

  /**
   * _ or - to CamelCase
   */
  camelize: target => {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
      return target;
    }

    return target.replace(/[-_][^-_]/g, function (match) {
      return match.charAt(1).toUpperCase();
    });
  },

  /**
   * Turn CamelCase to '_'
   */
  underscored: target => {
    return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  },

  /**
   * Turn '_' in a string into '-'
   */
  dasherize: function (target) {
    return this.underscored(target).replace(/_/g, '-');
  },

  /**
   * Truncates a string up to a specified length.
   * The default length is 3, and the truncated symbol defaults '...'
   */
  truncate: (str, num) => str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str,

  /**
   * Returns the length of a string in bytes.
   */
  byteSize: str => new Blob([str]).size,

  /**
   * Returns the length of a string in bytes by Unicode (utf-8 utf8 utf-16 utf16)
   */
  byteLen: (str, charset) => {
    let target = 0;
    let charCode;
    let i;
    let len;

    let _charset = charset ? charset.toLowerCase() : '';

    if (_charset === 'utf-16' || _charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);

        if (charCode <= 0xffff) {
          target += 2;
        } else {
          target += 4;
        }
      }
    } else {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);

        if (charCode <= 0x007f) {
          target += 1;
        } else if (charCode <= 0x07ff) {
          target += 2;
        } else if (charCode <= 0xffff) {
          target += 3;
        } else {
          target += 4;
        }
      }
    }

    return target;
  },

  /**
   * Repeat item, times times
   */
  repeat: (item, times) => {
    let s = item;
    let target = '';

    while (times > 0) {
      if (times % 2 === 1) {
        target += s;
      }

      if (times === 1) {
        break;
      }

      s += s; // eslint-disable-next-line no-param-reassign

      times = times >> 1;
    }

    return target;
  },

  /**
   * Item is the end of the target
   */
  endsWith: (target, item, ignore) => {
    let str = target.slice(-item.length);
    return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
  },

  /**
   *  Item is the beginning of the target
   */
  startsWith: (target, item, ignore) => {
    let str = target.slice(0, item.length);
    return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
  },

  /**
   * Whether a string contains another string
   */
  contains: (target, item) => {
    // discuss at: https://locutus.io/golang/strings/Contains
    // original by: Kevin van Zonneveld (https://kvz.io)
    // example 1: bbo.string.contains('Kevin', 'K')
    // returns 1: true
    return String(target).indexOf(item) !== -1;
  },

  /**
   * XSS string filtering
   */
  xssFilter: str => {
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');
  },
  index: (s, sep) => {
    //  discuss at: https://locutus.io/golang/strings/Index
    // original by: Kevin van Zonneveld (https://kvz.io)
    //   example 1: Index('Kevin', 'K')
    //   returns 1: 0
    //   example 2: Index('Kevin', 'Z')
    //   returns 2: -1
    return String(s).indexOf(sep);
  },
  capwords: str => {
    //   example 1: capwords('kevin van  zonneveld')
    //   returns 1: 'Kevin Van  Zonneveld'
    //   example 2: capwords('HELLO WORLD')
    //   returns 2: 'HELLO WORLD'
    let pattern = /^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g;
    return String(str).replace(pattern, function ($1) {
      return $1.toUpperCase();
    });
  }
};

/************************************************************************
 * localStorage && sessionStorage
 * Method for safely supporting localStorage sessionStorage 'setItem' 'getItem' 'removeItem' 'removeAll',
 * Some extension method 'has' 'get' adn Store prefix
 *************************************************************************/
const ulocalStorage = window.localStorage;
const ussesionStorage = window.sessionStorage;

class Storage {
  constructor(options) {
    const {
      type = 'local',
      prefix = 'bbo.storage',
      message = {
        setItem: 'write in',
        getItem: 'read',
        removeAll: 'remove all',
        removeItem: 'remove item'
      }
    } = options;
    this.prefix = prefix;
    this.type = type;
    this.message = message;

    if (type === 'local') {
      this._storage = ulocalStorage;
    } else if (type === 'session') {
      this._storage = ussesionStorage;
    }
  }

  doItem(func, action) {
    try {
      if (typeof func === 'function') {
        return func();
      }
    } catch (err) {
      this._warn(action);

      return null;
    }

    return true;
  }

  setItem(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((k, index) => {
        this.doItem(() => this._storage.setItem(`${this.prefix}.${k}`, JSON.stringify(key[k])), 'setItem');
      });
    } else {
      this.doItem(() => this._storage.setItem(`${this.prefix}.${key}`, JSON.stringify(value)), 'setItem');
    }
  }

  has(...keys) {
    return keys.every((key, index) => this._storage.getItem(`${this.prefix}.${key}`));
  }

  get(...keys) {
    const result = {};
    keys.forEach((key, index) => {
      if (`${this._storage.getItem(`${this.prefix}.${key}`)}` !== 'null') {
        try {
          result[key] = JSON.parse(this._storage.getItem(`${this.prefix}.${key}`));
        } catch (err) {
          console.warn(this._warn('getItem'));
        }
      }
    });
    return result;
  }

  getItem(key) {
    return this.doItem(() => JSON.parse(this._storage.getItem(`${this.prefix}.${key}`)), 'getItem');
  }

  removeAll() {
    Object.keys(this._storage).forEach(k => {
      if (string.contains(k, this.prefix)) {
        this._remove(`${k}`);
      }
    });
  }

  removeItem(...keys) {
    console.log(keys);
    keys.forEach((key, index) => this.doItem(() => this._storage.removeItem(`${this.prefix}.${key}`), 'removeItem'));
  }

  _warn(action) {
    const {
      message
    } = this;
    console.warn(`Unable to ${message[action] || ''} ${this.type} Storage`);
  }

  _remove(keys) {
    this.doItem(() => this._storage.removeItem(`${keys}`), 'removeItem');
  }

}

const storage = ({
  type,
  prefix
}) => new Storage({
  type,
  prefix
});

/************************************************************************
 * About Url Params
 *************************************************************************/

/**
 * getUrlParam / deleteUrlParam
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
const getUrlParam = (name, url = window.location.href) => {
  name.replace(/[\[\]]/g, '\\$&');
  let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  let results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}; // const getURLParameters = (url) =>
//   (url.match(/([^?=&]+)(=([^&]*))/g) || []).reduce(
//     (a, v) => ((a[v.slice(0, v.indexOf('='))] = v.slice(v.indexOf('=') + 1)), a),
//     {}
//   );

/**
 * setUrlParam
 * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
 */


const setUrlParam = (key, value, url = window.location.href) => {
  let re = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');

  if (url.match(re)) {
    return url.replace(re, '$1' + key + '=' + encodeURIComponent(value) + '$2');
  } else {
    let hash = '';

    if (url.indexOf('#') !== -1) {
      hash = url.replace(/.*#/, '#');
      url.replace(/#.*/, '');
    }

    let separator = url.indexOf('?') !== -1 ? '&' : '?';
    return url + separator + key + '=' + encodeURIComponent(value) + hash;
  }
}; // bbo.deleteUrlParam = bbo.delUrlParam


const deleteUrlParam = (param, url = window.location.href) => {
  // prefer to use l.search if you have a location/link object
  let urlparts = url.split('?');

  if (urlparts.length >= 2) {
    let prefix = encodeURIComponent(param) + '=';
    let pars = urlparts[1].split(/[&;]/g); // reverse iteration as may be destructive

    for (let i = pars.length; i-- > 0;) {
      // idiom for string.startsWith
      if (pars[i].lastIndexOf(prefix, 0) !== -1) {
        pars.splice(i, 1);
      }
    }

    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  } else {
    return url;
  }
};

const objectParam = arr => {
  let str = '';

  if (Array.isArray(arr)) {
    str = arr.map(function (item) {
      return item.name + '=' + item.value;
    }).join('&');
  } else {
    str = objectParam(objectBigParam(arr));
  }

  return str;
};

const objectBigParam = obj => {
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
};

const httpGet = (url, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = () => callback(request.responseText);

  request.onerror = () => err(request);

  request.send();
};

const httpPost = (url, data, callback, err = console.error) => {
  const request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  request.onload = () => callback(request.responseText);

  request.onerror = () => err(request);

  request.send(data);
};

/**
 * Array
 */
let array = {
  /**
   * Returns all unique values of an array.
   */
  unique: arr => [...new Set(arr)],

  /**
   * Returns all unique values of an array, based on a provided comparator function.
   */
  uniqueBy: (arr, fn) => arr.reduce((acc, v) => {
    if (!acc.some(x => fn(v, x))) acc.push(v);
    return acc;
  }, []),

  /**
   * Returns a random element from an array.
   */
  random: arr => arr[Math.floor(Math.random() * arr.length)],

  /**
   * Gets n random elements at unique keys from array up to the size of array.
   */
  randomSize: ([...arr], n = 1) => {
    let m = arr.length;

    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }

    return arr.slice(0, n);
  },

  /**
   * Randomizes the order of the values of an array, returning a new array.
   */
  shuffle: ([...arr]) => {
    let m = arr.length;

    while (m) {
      const i = Math.floor(Math.random() * m--);
      [arr[m], arr[i]] = [arr[i], arr[m]];
    }

    return arr;
  },

  /**
   * Returns true if the element has the specified Array, false otherwise.
   */
  contains: (target, item) => {
    return target.indexOf(item) > -1;
  },

  /**
   * Returns true if all the elements values are included in arr, false otherwise.
   */
  includesAll: (arr, values) => values.every(v => arr.includes(v)),

  /**
   * Returns true if at least one element of values is included in arr , false otherwise.
   */
  includesAny: (arr, values) => values.some(v => arr.includes(v)),

  /**
   * Remove the element specified by parameter 2 in parameter 1 and return Boolean
   */
  removeAt: function (target, index) {
    return !!target.splice(index, 1).length;
  },

  /**
   * Remove parameter 2 in parameter 1 and return boolean
   */
  remove: function (target, item) {
    let index = target.indexOf(item);
    return index > -1 ? this.removeAt(target, index) : false;
  },

  /**
   * Removes undefined and Null from an array.
   */
  compact: target => {
    return target.filter(item => {
      return item !== undefined;
    });
  },

  /**
   * Removes falsy values from an array.
   * (false, null, 0, "", undefined, and NaN).
   */
  compactAll: arr => arr.filter(Boolean),

  /**
   * Get the attribute values in an array object and combine them into a new array
   */
  pluck: (target, name) => {
    let result = [];
    let temp;
    target.forEach(function (item) {
      temp = item[name];

      if (temp !== null) {
        result.push(temp);
      }
    });
    return result;
  },

  /**
   * Returns every element that exists in any of the two arrays once
   * Create a Set with all values of a and b and convert to an array.
   */
  union: (a, b) => Array.from(new Set([...a, ...b])),

  /**
   * Returns every element that exists in any of the two arrays once,
   * after applying the provided function to each array element of both.
   */
  unionBy: (a, b, fn) => {
    const s = new Set(a.map(fn));
    return Array.from(new Set([...a, ...b.filter(x => !s.has(fn(x)))]));
  },

  /**
   * Returns every element that exists in any of the two arrays once,
   * using a provided comparator function.
   */
  unionWith: (a, b, comp) => {
    Array.from(new Set([...a, ...b.filter(x => a.findIndex(y => comp(x, y)) === -1)]));
  },

  /**
   * Returns a list of elements that exist in both arrays.
   */
  intersect: (a, b) => {
    const s = new Set(b);
    return a.filter(x => s.has(x));
  },

  /**
   * Returns a list of elements that exist in both arrays,
   * after applying the provided function to each array element of both.
   */
  intersectBy: (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.filter(x => s.has(fn(x)));
  },

  /**
   * Returns the difference between two arrays.
   * Create a Set from b, then use Array.prototype.
   * Filter() on a to only keep values not contained in b.
   */
  difference: (a, b) => {
    const s = new Set(b);
    return a.filter(x => !s.has(x));
  },

  /**
   * Returns the difference between two arrays,
   * after applying the provided function to each array element of both.
   */
  differenceBy: (a, b, fn) => {
    const s = new Set(b.map(fn));
    return a.map(fn).filter(el => !s.has(el));
  },

  /**
   * Returns the largest element in an array
   */
  max: target => {
    return Math.max.apply(0, target);
  },

  /**
   * Returns the smallest element in an array
   */
  min: target => {
    return Math.min.apply(0, target);
  },

  /**
   * Check two arrays are equal
   */
  equal: (arr1, arr2) => {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }

    return true;
  },

  /**
   * Check if all elements in an array are equal.
   */
  allEqual: arr => arr.every(val => val === arr[0]),

  /**
   * Returns true if the provided predicate function returns true for all elements in a collection, false otherwise.
   */
  all: (arr, fn = Boolean) => arr.every(fn),

  /**
   * Returns true if the provided predicate function returns true for at least one element in a collection,
   * false otherwise.
   */
  any: (arr, fn = Boolean) => arr.some(fn),

  /**
   * Chunks an array into smaller arrays of a specified size.
   */
  chunk: (arr, size) => {
    Array.from({
      length: Math.ceil(arr.length / size)
    }, (v, i) => arr.slice(i * size, i * size + size));
  },

  /**
   * Groups the elements of an array based on the given function and returns the count of elements in each group.
   */
  countBy: (arr, fn) => {
    arr.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {});
  },

  /**
   * Counts the occurrences of a value in an array.
   */
  countOccurrences: (arr, val) => {
    arr.reduce((a, v) => v === val ? a + 1 : a, 0);
  },

  /**
   * Returns a new array with n elements removed from the left.
   */
  drop: (arr, n = 1) => arr.slice(n),

  /**
   * Returns a new array with n elements removed from the right.
   */
  dropRight: (arr, n = 1) => arr.slice(0, -n),

  /**
   * Removes elements in an array until the passed function returns true.
   * Returns the remaining elements in the array.
   */
  dropWhile: (arr, func) => {
    let _arr = arr;

    while (_arr.length > 0 && !func(_arr[0])) _arr = _arr.slice(1);

    return _arr;
  },

  /**
   * Removes elements from the end of an array until the passed function returns true,
   * Returns the remaining elements in the array.
   */
  dropRightWhile: (arr, func) => {
    let rightIndex = arr.length;

    while (rightIndex-- && !func(arr[rightIndex]));

    return arr.slice(0, rightIndex + 1);
  },

  /**
   * discuss at: https://locutus.io/php/array_column/
   */
  column: (input, ColumnKey, IndexKey = null) => {
    let _input = input;

    if (_input !== null && (typeof _input === 'object' || Array.isArray(_input))) {
      let newArray = [];

      if (typeof _input === 'object') {
        let tempArray = [];

        for (let key of Object.keys(_input)) {
          tempArray.push(_input[key]);
        }

        _input = tempArray;
      }

      if (Array.isArray(_input)) {
        for (let key of _input.keys()) {
          if (IndexKey && _input[key][IndexKey]) {
            if (ColumnKey) {
              newArray[_input[key][IndexKey]] = _input[key][ColumnKey];
            } else {
              newArray[_input[key][IndexKey]] = _input[key];
            }
          } else {
            if (ColumnKey) {
              newArray.push(_input[key][ColumnKey]);
            } else {
              newArray.push(_input[key]);
            }
          }
        }
      }

      return { ...newArray
      };
    }
  },
  search: (needle, haystack, argStrict) => {
    // discuss at: https://locutus.io/php/array_search/'
    // example 1: bbo.array.search('3', {a: 3, b: 5, c: 7})
    // returns 1: 'a'
    let strict = !!argStrict;
    let key = '';
    let _needle = needle;

    if (typeof _needle === 'object' && _needle.exec) {
      // Duck-type for RegExp
      if (!strict) {
        // Let's consider case sensitive searches as strict
        let flags = 'i' + (_needle.global ? 'g' : '') + (_needle.multiline ? 'm' : '') + ( // sticky is FF only
        _needle.sticky ? 'y' : '');
        _needle = new RegExp(_needle.source, flags);
      }

      for (key in haystack) {
        if (haystack.hasOwnProperty(key)) {
          if (_needle.test(haystack[key])) {
            return key;
          }
        }
      }

      return false;
    }

    for (key in haystack) {
      if (haystack.hasOwnProperty(key)) {
        // eslint-disable-next-line eqeqeq
        if (strict && haystack[key] === needle || !strict && haystack[key] == needle) {
          return key;
        }
      }
    }

    return false;
  },
  unary: fn => val => fn(val)
};

const fill0 = num => {
  let _num = parseFloat(num);

  return _num < 10 ? '0' + _num : _num;
};

const chainAsync = fns => {
  let curr = 0;
  const last = fns[fns.length - 1];

  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };

  next();
};

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


const getDate = (d1, d2) => {
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
};
/**
 * @ zh_cn
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */


const formatPassTime = startTime => {
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
};
/**
 * @ zh_cn
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */


const formatRemainTime = endTime => {
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
};
/**
 * @ en
 * bbo.formatDuration(1001); // '1 second, 1 millisecond'
 * bbo.formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
 */


const formatDuration = ms => {
  // eslint-disable-next-line no-param-reassign
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time).filter(val => val[1] !== 0).map(([key, val]) => `${val} ${key}${val !== 1 ? 's' : ''}`).join(', ');
};

/**
 * Math
 */
let math = {
  /**
   * https://locutus.io/php/
   */
  numberFormat: (number, decimals, decPoint, thousandsSep) => {
    //   example 1: bbo.math.numberFormat(1234.56)
    //   returns 1: '1,235'
    //   example 2: bbo.math.numberFormat(1234.56, 2, ',', ' ')
    //   returns 2: '1 234,56'
    //   example 3: bbo.math.numberFormat(1234.5678, 2, '.', '')
    //   returns 3: '1234.57'
    //   example 4: bbo.math.numberFormat(67, 2, ',', '.')
    //   returns 4: '67,00'
    //   example 5: bbo.math.numberFormat(1000)
    //   returns 5: '1,000'
    //   example 6: bbo.math.numberFormat(67.311, 2)
    //   returns 6: '67.31'
    //   example 7: bbo.math.numberFormat(1000.55, 1)
    //   returns 7: '1,000.6'
    //   example 8: bbo.math.numberFormat(67000, 5, ',', '.')
    //   returns 8: '67.000,00000'
    //   example 9: bbo.math.numberFormat(0.9, 0)
    //   returns 9: '1'
    //  example 10: bbo.math.numberFormat('1.20', 2)
    //  returns 10: '1.20'
    //  example 11: bbo.math.numberFormat('1.20', 4)
    //  returns 11: '1.2000'
    //  example 12: bbo.math.numberFormat('1.2000', 3)
    //  returns 12: '1.200'
    //  example 13: bbo.math.numberFormat('1 000,50', 2, '.', ' ')
    //  returns 13: '100 050.00'
    //  example 14: bbo.math.numberFormat(1e-8, 8, '.', '')
    //  returns 14: '0.00000001'
    let _number = String(number).replace(/[^0-9+\-Ee.]/g, '');

    let _decimals = decimals;
    let n = !isFinite(Number(_number)) ? 0 : Number(_number);
    let prec = !isFinite(Number(_decimals)) ? 0 : Math.abs(_decimals);
    let sep = typeof thousandsSep === 'undefined' ? ',' : thousandsSep;
    let dec = typeof decPoint === 'undefined' ? '.' : decPoint;
    let s = '';

    let toFixedFix = function (n, prec) {
      if (String(n).indexOf('e') === -1) {
        return Number(Math.round(n + 'e+' + prec) + 'e-' + prec);
      } else {
        let arr = String(n).split('e');
        let sig = '';

        if (Number(arr[1]) + prec > 0) {
          sig = '+';
        }

        return Number(Math.round(Number(arr[0]) + 'e' + sig + (Number(arr[1]) + prec)) + 'e-' + prec).toFixed(prec);
      }
    }; // @todo: for IE parseFloat(0.55).toFixed(0) = 0;


    s = (prec ? toFixedFix(n, prec).toString() : String(Math.round(n))).split('.');

    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }

    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }

    return s.join(dec);
  }
};

/************************************************************************
 * Random And Math
 *************************************************************************/
const randomColor = () => {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}; // bbo.randomFromA2B = bbo.randomA2B


const randomA2B = (a, b, int) => {
  let result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

const randomKey = (len = 32) => {
  /** Removed confusing characters 'oOLl,9gq,Vv,Uu,I1' **/
  let possible = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let key = '';

  for (let i = 0; i < len; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return key;
};

const floor = (n, m = 0) => {
  return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
};

/************************************************************************
 * Mobile
 *************************************************************************/

/**
 * lock touch in mobile phone
 */
const lockTouch = () => {
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
};

/**
 * Check image size
 * @param {(Object|String)} image - image information，allow File Object or Data URLs
 * @param {Object} [options={}] - Check options
 * @param {Number} [options.width] - Check width
 * @param {Number} [options.height] - Check height
 * @param {Number} [deviation=0] - Allowable deviation
 */
const checkImageSize = (image, options, deviation = 0) => {
  return new Promise((resolve, reject) => {
    /**
     * Check type of image
     */
    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = function () {
        checkSize(this.result);
      };

      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      checkSize(image);
    }
    /**
     * Check picture size
     * @param {String} data：Data URL
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
  });
};
/**
 * Image optimization
 * Gif images are not supported
 * @param {(Object|String)} - image ,supported File Object or Data URLs
 * @param {Number} [quality = 0.9] - Image quality, between 0 - 1, only image/jpeg or image/webp is accept.
 * @param {Object} [options = {}] - Image options
 * @param {Number} [options.maxWidth = 1920] - The maximum width of the output picture.
 * If the original width of the picture is less than this width, the original size picture is returned.
 * If the original width of the picture is greater than the width, the picture scaled to the size is returned.
 * @param {String} [options.mimeType] - Output image type，Types of MIME.
 * @returns {Object} Promise , resolve Function parameters are optimized pictures Blob Object,
 * If the output type is image/gif，Then return as is image Parameter content.
 */


const imageOptimization = (image, quality = 0.9, {
  maxWidth = 1920,
  mimeType
} = {}) => {
  return new Promise((resolve, reject) => {
    if (image instanceof File) {
      const reader = new FileReader();

      reader.onload = function () {
        toBlob(this.result);
      };

      reader.readAsDataURL(image);
    } else if (typeof image === 'string') {
      toBlob(image);
    }
    /**
     * To Blob
     * @param {String} data - Image: Data URL
     */


    function toBlob(data) {
      const type = data.match(/data:([^;,]+)/);

      if (Array.isArray(type)) {
        const outputType = mimeType ? mimeType : type[1];

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
        reject(new Error('[Slug Function] Non-picture type Data URLs'));
      }
    }
  });
};

/* eslint-disable */

/**
 *  Mini lodash is easy to implement, consistent with the lodash class name.
 *  Function parameters only implement basic verification.
 *  Which is less stable than lodash
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

const isEmpty = val => val == null || !(Object.keys(val) || val).length;

function is(x, y) {
  // inlined Object.is polyFill to avoid requiring consumers ship their own
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
const reEscapeChar = /\\(\\)?/g;
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
    // deBounced at least once.

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
}

const pick = (obj, arr) => arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {}); // Only omit the first-level key, shallow copy objec


const omit = (obj, arr) => Object.keys(obj).filter(k => !arr.includes(k)).reduce((acc, key) => (acc[key] = obj[key], acc), {});

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
  merge,
  over,
  call,
  // bom
  open,
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  query,
  show,
  hide,
  copyToClipboard,
  elementContains,
  formToObject,
  getStyle,
  setStyle,
  attr,
  // other
  uuid,
  hash,
  judge,
  judgment: judge,
  getType,
  isTypeof,
  construct,
  paramsName,
  // other function
  loadImages,
  loadjs,
  loadcss,
  toJson,
  toJSON: toJson,
  tojson: toJson,
  // cookie
  cookie,
  setCookie,
  getCookie,
  deleteCookie,
  delCookie: deleteCookie,
  parseCookie,
  // storage
  storage,
  // url
  getUrlParam,
  setUrlParam,
  deleteUrlParam,
  delUrlParam: deleteUrlParam,
  objectParam,
  httpGet,
  httpPost,
  // times
  setTimesout,
  clearTimesout,
  getDate,
  formatPassTime,
  formatRemainTime,
  formatDuration,
  // fill
  fill0,
  chainAsync,
  // math
  math,
  // random
  randomColor,
  randomA2B,
  randomFromA2B: randomA2B,
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
  omit,
  // string
  string,
  // array
  array
};

export default bbo;
