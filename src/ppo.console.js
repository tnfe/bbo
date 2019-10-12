/*
 * @Author: halldWang
 * @Date: 2018-07-26 17:31:30
 * @Last Modified by: halldWang
 * @Last Modified time: 2018-09-12 15:37:14
 * @cdn Url: //mat1.gtimg.com/www/js/libs/ppo.console.js
 */

(function(root, factory) {
  if (typeof exports === 'object' && typeof module === 'object') module.exports = factory();
  else if (typeof define === 'function' && define.amd) define([], factory);
  else if (typeof exports === 'object') exports['ppoConsole'] = factory();
  else root['ppoConsole'] = factory();
})(this, function() {
  var ppoConsole = {};
  ppoConsole.settings = {
    cdn: '//mat1.gtimg.com/joke/js/ppo/vconsole/vconsole.3.2.0.min.js',
    reportUrl: null,
    reportPrefix: '',
    reportKey: 'msg',
    otherReport: null,
    entry: null
  };

  ppoConsole.store = [];

  var methodList = ['log', 'info', 'warn', 'debug', 'error'];
  methodList.forEach(function(item) {
    var method = console[item];

    console[item] = function() {
      ppoConsole.store.push({
        logType: item,
        logs: arguments
      });

      method.apply(console, arguments);
    };
  });

  ppoConsole.logs = [];
  ppoConsole.config = function(config) {
    for (var i in config) {
      if (config.hasOwnProperty(i)) {
        ppoConsole.settings[i] = config[i];
      }
    }

    if (config.entry) {
      window.addEventListener('load', function() {
        ppoConsole.entry(config.entry);
      });
    }

    var parameter = getParameter('vconsole');

    if (parameter) {
      if (parameter === 'show') {
        ppoConsole.vConsole(true);
      } else {
        ppoConsole.vConsole(false);
      }
    }
  };

  ppoConsole.vConsole = function(show) {
    loadScript(ppoConsole.settings.cdn, function() {
      //support vconsole3.0
      if (typeof vConsole === 'undefined') {
        vConsole = new VConsole({
          defaultPlugins: ['system', 'network', 'element', 'storage'],
          maxLogNumber: 5000
        });
      }

      var i = 0,
        len = ppoConsole.store.length;

      for (; i < len; i++) {
        var item = ppoConsole.store[i];
        //console[item.type].apply(console, item.logs)
        //prevent twice log
        item.noOrigin = true;
        vConsole.pluginList.default.printLog(item);
      }

      if (show) {
        try {
          vConsole.show();
        } catch (e) {}

        window.addEventListener('load', function() {
          vConsole.show();
        });
      }
    });
  };

  ppoConsole.entry = function(selector) {
    var count = 0,
      entry = document.querySelector(selector);
    if (entry) {
      entry.addEventListener('click', function() {
        count++;
        if (count > 8) {
          count = -10000;
          ppoConsole.vConsole(true);
        }
      });
    }
  };

  window.onerror = function(msg, url, line, col, error) {
    var newMsg = msg;

    if (error && error.stack) {
      newMsg = processStackMsg(error);
    }

    if (isOBJByType(newMsg, 'Event')) {
      newMsg += newMsg.type
        ? '--' +
          newMsg.type +
          '--' +
          (newMsg.target ? newMsg.target.tagName + '::' + newMsg.target.src : '')
        : '';
    }

    newMsg = (newMsg + '' || '').substr(0, 500);

    ppoConsole.logs.push({
      msg: newMsg,
      target: url,
      rowNum: line,
      colNum: col
    });

    if (msg.toLowerCase().indexOf('script error') > -1) {
      console.error('Script Error: See Browser Console for Detail');
    } else {
      console.error(newMsg);
    }

    var ss = ppoConsole.settings;
    if (ss.reportUrl) {
      var src =
        ss.reportUrl +
        (ss.reportUrl.indexOf('?') > -1 ? '&' : '?') +
        ss.reportKey +
        '=' +
        (ss.reportPrefix ? '[' + ss.reportPrefix + ']' : '') +
        newMsg +
        '&t=' +
        new Date().getTime();
      if (ss.otherReport) {
        for (var i in ss.otherReport) {
          if (ss.otherReport.hasOwnProperty(i)) {
            src += '&' + i + '=' + ss.otherReport[i];
          }
        }
      }
      new Image().src = src;
    }
  };

  function loadScript(src, callback) {
    var s, r, t;
    r = false;
    s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = src;
    s.onload = s.onreadystatechange = function() {
      //console.log( this.readyState ); //uncomment this line to see which ready states are called.
      if (!r && (!this.readyState || this.readyState == 'complete')) {
        r = true;
        callback();
      }
    };
    t = document.getElementsByTagName('script')[0];
    t.parentNode.insertBefore(s, t);
  }

  function getParameter(n) {
    var m = window.location.hash.match(new RegExp('(?:#|&)' + n + '=([^&]*)(&|$)')),
      result = !m ? '' : decodeURIComponent(m[1]);
    return result || getParameterByName(n);
  }

  function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }

  function isOBJByType(o, type) {
    return Object.prototype.toString.call(o) === '[object ' + (type || 'Object') + ']';
  }

  function processStackMsg(error) {
    var stack = error.stack
      .replace(/\n/gi, '')
      .split(/\bat\b/)
      .slice(0, 9)
      .join('@')
      .replace(/\?[^:]+/gi, '');
    var msg = error.toString();
    if (stack.indexOf(msg) < 0) {
      stack = msg + '@' + stack;
    }
    return stack;
  }

  function getCookie(name) {
    var arr,
      reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');

    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  }

  ppoConsole.getCookie = getCookie;
  ppoConsole.getParameter = getParameter;
  ppoConsole.loadScript = loadScript;

  return ppoConsole;
});
