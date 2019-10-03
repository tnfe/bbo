/*
 * PPO
 * +++++++++ a utility-belt library for JavaScript +++++++++
 * (c) 2011-2018 halld add
 * https://github.com/halldwang/ppo
 * version 1.3.22
 */
(function(global, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    global.ppo = factory();
  }
// eslint-disable-next-line no-invalid-this
})(this, function() {
  function ppo() {}
  /************************************************************************
   * Detecting
   *************************************************************************/
  /**
   * detect IOS
   * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
   * more see:
   * https://github.com/madrobby/zepto/blob/master/src/detect.js#files
   */
  ppo.isIOS = ppo.isIos = function() {
    return /iPad|iPhone|iPod/.test(ppo.ua());
  };

  ppo.isiPhone = function() {
    return /iPhone/.test(ppo.ua());
  };

  ppo.isIphoneXmodel = function() {
    // X XS, XS Max, XR
    const xSeriesConfig = [
      {
        devicePixelRatio: 3,
        width: 375,
        height: 812
      },
      {
        devicePixelRatio: 3,
        width: 414,
        height: 896
      },
      {
        devicePixelRatio: 2,
        width: 414,
        height: 896
      }
    ];
    if (typeof window !== 'undefined' && window) {
      const { devicePixelRatio, screen } = window;
      const { width, height } = screen;
      return xSeriesConfig.some(
        (item) =>
          item.devicePixelRatio === devicePixelRatio &&
          item.width === width &&
          item.height === height
      );
    }
    return false;
  };

  ppo.isIPad = function() {
    return /iPad/.test(ppo.ua());
  };

  /**
   * detect Android
   * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
   */
  ppo.isAndroid = function() {
    return ppo.ua('l').indexOf('android') > -1;
  };

  /**
   * detect PC / Mobile
   * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
   */
  ppo.isMobile = function() {
    return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ppo.ua('l'));
  };

  ppo.isPC = function() {
    return !this.isMobile();
  };

  ppo.isWeixin = function() {
    return /MicroMessenger/i.test(ppo.ua('l'));
  };

  ppo.isNewsApp = function(e) {
    return /qqnews/.test(ppo.ua());
  };

  ppo.mqqbrowser = function() {
    return /mqqbrowser\//.test(ppo.ua()); // QQ浏览器
  };

  ppo.qq = function() {
    return /qq\//.test(ppo.ua()); // 手机QQ
  };

  ppo.tenvideo = function() {
    return /qqlivebrowser/.test(ppo.ua()); // 腾讯视频
  };

  /**
   * detect ie
   * From https://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript
   */
  ppo.isIE = function() {
    return ppo.ieVer() > 0;
  };

  /**
   * ie version
   * From https://codepen.io/gapcode/pen/vEJNZN
   * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
   * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
   * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
   * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
   */
  ppo.ieVersion = ppo.ieVer = function() {
    let ua = ppo.ua();
    let msie = ua.indexOf('MSIE ');
    if (msie > 0) {
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    }

    let trident = ua.indexOf('Trident/');
    if (trident > 0) {
      let rv = ua.indexOf('rv:');
      return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
    }

    let edge = ua.indexOf('Edge/');
    if (edge > 0) {
      return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
    }

    return '';
  };

  /**
   * navigator.userAgent
   */
  ppo.ua = function(lower) {
    return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
  };

  /************************************************************************
   * LOGS
   *************************************************************************/
  /**
   * log on mobile html body
   */
  ppo.log = function(msg, styles) {
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
  };

  /**
   * ppo.logs('onlyid&10', 1, 2);
   */
  ppo.logs = function() {
    if (window.console && window.console.log) {
      let onlyid = String(arguments[0]);
      let times = parseInt(onlyid.split('&')[1], 10) || 10;
      let logsCache = ppo._cache.logs;

      if (!logsCache[onlyid]) logsCache[onlyid] = {};
      if (!logsCache[onlyid].once) logsCache[onlyid].once = 1;

      if (logsCache[onlyid].once <= times) {
        console.log.apply(console, ppo.args(arguments, 1));
        logsCache[onlyid].once++;
      }
    }
  };

  ppo.removeConsole = function(clear) {
    try {
      if (!window.console) window.console = {};
      window.console.log = window.console.info = window.console.dir = window.console.warn = window.console.trace =
        ppo.noop;
      if (clear === 'clear' && window.console.clear) window.console.clear();
    } catch (e) {}
  };

  /************************************************************************
   * Bom and Dom
   *************************************************************************/
  /**
   * open new url dont not blocked by browser
   */
  ppo.open = function(href) {
    let id = '_ppo_open_proxy';
    let a = document.getElementById(id) || document.createElement('a');
    a.setAttribute('id', id);
    a.setAttribute('href', href);
    a.setAttribute('target', '_blank');
    a.style.display = 'none';

    if (!a.parentNode) document.body.appendChild(a);
    this.trigger(a, 'click', 'MouseEvents');
  };

  ppo.stopPropagation = function(e) {
    let _e = e || window.event;
    if (_e.stopPropagation) {
      _e.stopPropagation(); // W3C
    } else {
      _e.cancelBubble = true; // IE
    }
  };

  ppo.g = function(i) {
    return document.getElementById(i);
  };

  ppo.gc = function(cn) {
    return document.getElementsByClassName(cn);
  };

  ppo.c = function(t, cn, i, id) {
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
  };
  // 极简路由
  ppo.Router = function() {
    this.hash = window.location.hash.substring(1);
  };

  ppo.Router.prototype = {
    // 设置路由
    add: function(_hash, callback) {
      let _this = this;
      _checkRouter(_this.hash);
      _this.bindHashChange(function(__hash) {
        _checkRouter(__hash);
      });

      function _checkRouter(__hash) {
        if (_hash === __hash) {
          if (typeof callback === 'function') {
            callback();
          }
        }
      }
    },
    // hashChange事件监听
    bindHashChange: function(callback) {
      let _this = this;
      if ('onhashchange' in window) {
        _this.addEvent(window, 'hashchange', function() {
          _this.hash = window.location.hash.substring(1);
          if (typeof callback === 'function') {
            callback(_this.hash);
          }
        });
      } else {
        setInterval(function() {
          let ischanged = _this.hash !== window.location.hash.substring(1);
          if (ischanged) {
            _this.hash = window.location.hash.substring(1);
            if (typeof callback === 'function') {
              callback(_this.hash);
            }
          }
        }, 150);
      }
    },
    // 事件绑定函数兼容
    addEvent: function(el, eventType, callback) {
      if (el.addEventListener) {
        return el.addEventListener(eventType, callback, false);
      } else if (el.attachEvent) {
        return el.attachEvent(eventType, callback);
      } else {
        let event = (el['on' + eventType] = callback);
        return event;
      }
    }
  };
  // 实例化
  ppo.Router.init = function() {
    let router = new ppo.Router();
    return router;
  };
  /**
   * trigger event
   * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
   */
  ppo.trigger = function(element, event, eventType) {
    if (document.createEventObject) {
      let e = document.createEventObject();
      return element.fireEvent('on' + event, e);
    } else {
      let e = document.createEvent(eventType || 'HTMLEvents');
      e.initEvent(event, true, true);
      element.dispatchEvent(e);
    }
  };

  /**
   * setInterval func fix times
   * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
   */
  ppo.setTimesout = function() {
    let func = arguments[0];
    let delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
    let times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);
    let args = arguments.length > 3 ? ppo.args(arguments, 3) : null;
    let target = {
      index: 0,
      times: times,
      over: false
    };

    let id = setInterval(function() {
      target.index++;
      if (target.index > times) {
        clearInterval(id);
      } else {
        if (target.index === times) target.over = true;
        func.apply(target, args);
      }
    }, delay);

    return id;
  };

  ppo.clearTimesout = function(id) {
    clearInterval(id);
  };

  /**
   * construct
   * https://stackoverflow.com/questions/1606797/use-of-apply-with-new-operator-is-this-possible
   */
  ppo.construct = function() {
    let classs = arguments[0];
    return new (Function.prototype.bind.apply(classs, arguments))();
  };

  /**
   * Gets all the formal parameter names of a function
   * https://www.zhihu.com/question/28912825
   */
  ppo.paramsName = function(fn) {
    return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
  };

  /************************************************************************
   * Date
   *************************************************************************/
  /**
   * getDate
   * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
   */
  ppo.getDate = function(d1, d2) {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let ms = today.getMinutes();
    let ss = today.getSeconds();

    dd = ppo.fill0(dd);
    mm = ppo.fill0(mm);
    hh = ppo.fill0(hh);
    ms = ppo.fill0(ms);
    ss = ppo.fill0(ss);

    let _d1 = d1 || '/';
    let _d2 = d2 || ':';

    return yyyy + _d1 + mm + _d1 + dd + ' ' + hh + _d2 + ms + _d2 + ss;
  };

  /**
   * @desc   格式化${startTime}距现在的已过时间
   * @param  {Date} startTime
   * @return {String}
   */
  ppo.formatPassTime = function(startTime) {
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
    if (min) return min + '分钟前';
    else return '刚刚';
  };

  /**
   *
   * @desc   格式化现在距${endTime}的剩余时间
   * @param  {Date} endTime
   * @return {String}
   */
  ppo.formatRemainTime = function(endTime) {
    let startDate = new Date(); // 开始时间
    let endDate = new Date(endTime); // 结束时间
    let t = endDate.getTime() - startDate.getTime(); // 时间差
    let d = 0;
    let h = 0;
    let m = 0;
    let s = 0;
    if (t >= 0) {
      d = Math.floor(t / 1000 / 3600 / 24);
      h = Math.floor((t / 1000 / 60 / 60) % 24);
      m = Math.floor((t / 1000 / 60) % 60);
      s = Math.floor((t / 1000) % 60);
    }
    return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
  };

  /************************************************************************
   * About Url Params
   *************************************************************************/

  /**
   * getUrlParam / deleteUrlParam
   * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
   */
  ppo.getUrlParam = function(name, url) {
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
  };

  /**
   * setUrlParam
   * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
   */
  ppo.setUrlParam = function(key, value, url) {
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
  };

  ppo.deleteUrlParam = ppo.delUrlParam = function(param, url) {
    let _url = url;
    if (!_url) {
      _url = window.location.href;
    }
    // prefer to use l.search if you have a location/link object
    let urlparts = _url.split('?');
    if (urlparts.length >= 2) {
      let prefix = encodeURIComponent(param) + '=';
      let pars = urlparts[1].split(/[&;]/g);

      // reverse iteration as may be destructive
      for (let i = pars.length; i-- > 0; ) {
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
  };

  ppo.objectParam = function(arr) {
    let str = '';
    if (Array.isArray(arr)) {
      str = arr
        .map(function(item) {
          return item.name + '=' + item.value;
        })
        .join('&');
    } else {
      str = ppo.objectParam(ppo.objectBigParam(arr));
    }
    return str;
  };

  ppo.objectBigParam = function(obj) {
    let arr = [];
    Object.keys(obj).forEach(function(k) {
      if (Array.isArray(obj[k])) {
        arr = arr.concat(
          obj[k].map(function(v) {
            return {
              name: k,
              value: v
            };
          })
        );
      } else {
        arr.push({
          name: k,
          value: obj[k]
        });
      }
    });
    return arr;
  };

  /************************************************************************
   * Cookies
   *************************************************************************/
  /**
   * setCookie / getCookie / deleteCookie
   * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
   * change by a-jie
   */
  ppo.setCookie = function(name, value, option) {
    let longTime = 10;
    // let path = '; path=/';
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

  ppo.getCookie = function(name) {
    let nameEQ = encodeURIComponent(name) + '=';
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }

    return null;
  };

  ppo.deleteCookie = ppo.delCookie = function(name) {
    this.setCookie(name, '', {
      hour: -1
    });
  };
  /**
   * cookie
   * https://github.com/jiayi2/onavo/blob/master/onavo.js#L209
   */
  ppo.cookie = function() {
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
      function api(key, value, attributes) {
        let result;
        if (typeof document === 'undefined') {
          return;
        }
        if (arguments.length > 1) {
          let _attributes = _extend(
            {
              path: '/'
            },
            api.defaults,
            attributes
          );

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
            _value = encodeURIComponent(String(_value)).replace(
              /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
              decodeURIComponent
            );
          } else {
            _value = converter.write(_value, key);
          }

          let _key = encodeURIComponent(String(key));
          let __key = _key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
          let ___key = __key.replace(/[\(\)]/g, escape);
          let _cookie = (document.cookie = [
            ___key,
            '=',
            value,
            attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '',
            attributes.path ? '; path=' + attributes.path : '',
            attributes.domain ? '; domain=' + attributes.domain : '',
            attributes.secure ? '; secure' : ''
          ].join(''));

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
            cookie = converter.read
              ? converter.read(cookie, name)
              : converter(cookie, name) || cookie.replace(rdecode, decodeURIComponent);

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
      api.get = function(key) {
        return api.call(api, key);
      };
      api.getJSON = api.getjson = api.getJson = function() {
        return api.apply(
          {
            json: true
          },
          [].slice.call(arguments)
        );
      };
      api.defaults = {};

      api.remove = function(key, attributes) {
        api(
          key,
          '',
          _extend(attributes, {
            expires: -1
          })
        );
      };

      api.withConverter = init;

      return api;
    }
    return init(function() {});
  };

  /************************************************************************
   * Random And Math
   *************************************************************************/
  ppo.randomColor = function() {
    return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
  };

  ppo.randomFromArray = ppo.randomfArr = function(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  ppo.randomFromA2B = ppo.randomA2B = function(a, b, int) {
    let result = Math.random() * (b - a) + a;
    return int ? Math.floor(result) : result;
  };

  ppo.randomKey = function(length) {
    let key = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let _length = length || 6;

    for (let i = 0; i < _length; i++)
      key += possible.charAt(Math.floor(Math.random() * possible._length));
    return key;
  };

  ppo.floor = function(n, m) {
    let _m = m || 0;
    return Math.floor(n * Math.pow(10, _m)) / Math.pow(10, _m);
  };

  ppo.fill0 = function(num) {
    let _num = parseFloat(num);
    return _num < 10 ? '0' + _num : _num;
  };

  /************************************************************************
   * Mobile
   *************************************************************************/
  /**
   * lock touch in mobile phone
   */
  ppo.lockTouch = function() {
    document.addEventListener(
      'touchmove',
      function(e) {
        e.preventDefault();
      },
      !1
    );
    document.addEventListener('touchstart', preventDefault, !1);
    document.addEventListener('touchend', preventDefault, !1);

    function not(e, tag) {
      return e.target.tagName !== tag.toUpperCase() && e.target.tagName !== tag.toLowerCase();
    }

    function preventDefault(e) {
      if (not(e, 'input') && not(e, 'textarea') && not(e, 'select') && not(e, 'menus'))
        e.preventDefault();
    }
  };

  /************************************************************************
   * Assets
   *************************************************************************/
  /**
   * load js
   * 1. ppo.loadjs("//your_url/a.js",func);
   * 2. ppo.loadjs("//your_url/a.js","only_id",func);
   */
  ppo.loadjs = function(url, b, c) {
    let onlyId;
    let callback;

    if (typeof b === 'function') {
      onlyId = String(this.hash(String(url)));
      callback = b;
    } else if (typeof b === 'undefined') {
      onlyId = String(this.hash(String(url)));
      callback = null;
    } else {
      onlyId = String(b);
      callback = c;
    }

    if (ppo._cache.urls[onlyId]) {
      callback && callback();
    } else {
      let func = typeof url === 'string' ? _insertScript : _insertScripts;
      func.call(this, url, function() {
        ppo._cache.urls[onlyId] = true;
        callback && callback();
      });
    }
  };
  /*
   * https://gist.github.com/pete-otaqui/3912307
   */
  ppo.loadcss = function(url, callback) {
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
  };

  /* 数组方法 s */
  // 除了es5 forEach, map, filter, every, some, indexOf, lastIndexOf 新增的方法外
  // isArray unique random 都是自己实现的
  let A = (function() {
    let ret = {
      isArray: function(obj) {
        return Object.prototype.toString.call(obj) === '[object Array]';
      },
      unique: function(target) {
        // 数组去重
        let res = [];
        for (let i = 0, len = target.length; i < len; i++) {
          let current = target[i];
          if (res.indexOf(current) === -1) {
            res.push(current);
          }
        }
        return res;
      },
      random: function(target) {
        // 在数组中随机取一个
        return target[Math.floor(Math.random() * target.length)];
      },
      shuffle: function(target) {
        // 打乱数组返回新数组
        let m = target.length;
        while (m > 1) {
          let index = Math.floor(Math.random() * m--);
          [target[m], target[index]] = [target[index], target[m]];
        }
        return target;
      },
      equal: function(arr1, arr2) {
        if (arr1 === arr2) return true;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; ++i) {
          if (arr1[i] !== arr2[i]) return false;
        }
        return true;
      },
      contains: function(target, item) {
        // 是否包含指定元素
        return target.indexOf(item) > -1;
      },
      removeAt: function(target, index) {
        // 在参数1中删除参数2指定位的元素返回布尔
        return !!target.splice(index, 1).length;
      },
      remove: function(target, item) {
        // 在参数1中删除参数2返回布尔
        let index = target.indexOf(item);
        return index > -1 ? this.removeAt(target, index) : false;
      },
      compact: function(target) {
        // 去除数组中的undefined和Null
        return target.filter(function(item) {
          return item !== undefined;
        });
      },
      pluck: function(target, name) {
        // 获取数组对象中的属性值，组合成新数组
        let result = [];
        let temp;
        target.forEach(function(item) {
          temp = item[name];
          if (temp !== null) {
            result.push(temp);
          }
        });
        return result;
      },
      union: function(t1, t2) {
        // 2个数组的并集
        return this.unique(t1.concat(t2));
      },
      intersect: function(t1, t2) {
        // 取2个数组的交集
        return t1.filter(function(item) {
          return t2.indexOf(item) !== -1;
        });
      },
      diff: function(t1, t2) {
        // 取差集
        let r = t1;
        for (let i = 0; i < t1.length; i++) {
          for (let j = 0; j < t2.length; j++) {
            if (r[i] === t2[j]) {
              r.splice(i, 1);
              i--;
              break;
            }
          }
        }
        return r;
      },
      max: function(target) {
        // max
        return Math.max.apply(0, target);
      },
      min: function(target) {
        // min
        return Math.min.apply(0, target);
      }
    };
    return ret;
  })();
  ppo.Array = A;
  /* 数组方法 e */
  /* 字符串s */
  let S = {
    // 去空格
    trim: function(str) {
      let _str = str.replace(/^\s+/, '');
      for (let i = str.length - 1; i >= 0; i--) {
        if (/\S/.test(str.charAt(i))) {
          _str = str.slice(0, i + 1);
          break;
        }
      }
      return _str;
    },
    print: function(str, object) {
      // 模仿C语言print方法
      let arr = [].slice.call(arguments, 1);
      let index;
      return str.replace(/#{([^{}]+)}/gm, function(match, name) {
        index = Number(name);
        if (index >= 0) {
          return arr[index];
        }
        if (object && object[name] !== '') {
          return object[name];
        }
        return '';
      });
    },
    // 补零
    fillZero: function(target, n) {
      let z = new Array(n).join('0');
      let str = z + target;
      let result = str.slice(-n);
      return result;
    },
    // 字符串去重
    longUnique: function(target) {
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
    // 去掉script内部的html标签
    stripTags: function(target) {
      return target.replace(/<script[^>]*>(\S\s*?)<\/script>/gim, '').replace(/<[^>]+>/g, '');
    },
    capitalize: function(target) {
      // 首字母大写
      return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
    },

    camelize: function(target) {
      // _ - 转驼峰命名
      if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
        return target;
      }
      return target.replace(/[-_][^-_]/g, function(match) {
        // console.log(match) 匹配测试
        return match.charAt(1).toUpperCase();
      });
    },
    underscored: function(target) {
      // 把驼峰转换成_
      return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
    },
    dasherize: function(target) {
      // 把字符串中的_转成-
      return this.underscored(target).replace(/_/g, '-');
    },
    truncate: function(target, len, truncation) {
      // 字符串截断方法 目标 长度默认30，截断后符号默认...
      let _len = len || 30;
      let _truncation = truncation ? truncation : '...';
      return target.length > _len
        ? target.slice(0, len - _truncation.length) + _truncation
        : target.toString();
    },
    byteLen: function(str, charset) {
      // 获得字符串字节长度 参数2 utf-8 utf8 utf-16 utf16
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
    repeat: function(item, times) {
      // 重复item,times次
      let s = item;
      let target = '';
      while (times > 0) {
        if (times % 2 === 1) {
          target += s;
        }
        if (times === 1) {
          break;
        }
        s += s;
        // eslint-disable-next-line no-param-reassign
        times = times >> 1;
      }
      return target;
    },
    endsWith: function(target, item, ignorecase) {
      // 参2是参1的结尾么？参数3忽略大小写
      let str = target.slice(-item.length);
      return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
    },
    startsWith: function(target, item, ignorecase) {
      // 参数2是参数1的开头么？参数3忽略大小写
      let str = target.slice(0, item.length);
      return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
    },
    containsClass: function(target, item, separator) {
      // 类名中，参数1 是否包含参数2，类名中的分隔符
      return separator
        ? (separator + target + separator).indexOf(separator + item + separator) > -1
        : this.contains(target, item);
    },
    contains: function(target, item) {
      // 判定一个字符串是否包含另一个字符串
      return target.indexOf(item) !== -1;
      // return target.indexOf(item) > -1;
    }
  };
  ppo.String = S;
  /* 字符串e */

  let loadImage = (function() {
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

    return loadImages;
  })();
  ppo.loadImage = loadImage;
  /************************************************************************
   * Other
   *************************************************************************/
  /**
   * generate uuid
   * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
   */
  ppo.uuid = function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  /**
   * string hash map
   * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
   */
  ppo.hash = function(str) {
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
   */
  ppo.judge = ppo.judgment = function(v, vals, strict) {
    if (!this.isTypeof(vals, 'array')) return false;

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
  ppo.isTypeof = function(val, type) {
    return (
      Object.prototype.toString
        .call(val)
        .slice(8, -1)
        .toLowerCase() === type
    );
  };
  ppo.getType = function(ele) {
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
  };

  /**
   * to json
   */
  ppo.toJSON = ppo.tojson = ppo.toJson = function(res) {
    if (!res) return null;

    if (typeof res === 'string') {
      try {
        return JSON.parse(res);
      } catch (e) {
        // eslint-disable-next-line no-eval
        return eval('(' + res + ')');
      }
    } else if (this.isTypeof(res.json, 'function')) {
      return res.json();
    } else {
      return res;
    }
  };

  /**
   * arguments to array
   */
  ppo.args = function($arguments, first) {
    return Array.prototype.slice.call($arguments, first || 0);
  };

  /**
   * a trash object
   */
  ppo.trash = {
    clear: function() {
      for (let key in ppo.trash) {
        if (key !== 'log' && key !== 'clear') delete ppo.trash[key];
      }
    },
    log: function() {
      for (let key in ppo.trash) {
        if (key !== 'log' && key !== 'clear') console.log('ppo.trash:: ', key, ppo.trash[key]);
      }
    }
  };

  ppo.noop = function() {};

  /************************************************************************
   *
   *   Private Method
   *
   *************************************************************************/
  ppo._cache = {
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

    if (/msie/.test(ppo.ua('l'))) {
      script.onreadystatechange = function() {
        if (this.readyState === 'loaded' || this.readyState === 'complete') {
          callback();
        }
      };
    } else if (/gecko/.test(ppo.ua('l'))) {
      script.onload = function() {
        callback();
      };
    } else {
      setTimeout(function() {
        callback();
      }, 50);
    }
  };

  // 扩展ajax
  ppo.ajax = ppo.ajax || {};
  // 扩展事件代理
  ppo.event = ppo.event || {};
  // 扩展模板
  ppo.template = ppo.template || {};
  // 模块依赖注入
  ppo.modules = ppo.modules || {};

  return ppo;
});
