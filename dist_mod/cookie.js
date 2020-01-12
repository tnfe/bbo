'use strict';

/**
 * cookie
 * https://github.com/jiayi2/onavo/blob/master/onavo.js#L209
 */
var cookie = () => {
  function _extend() {
    var i = 0;
    var result = {};

    for (; i < arguments.length; i++) {
      var attributes = arguments[i];

      for (var key in attributes) {
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
      var result;

      if (typeof document === 'undefined') {
        return;
      }

      if (arguments.length > 1) {
        var _attributes = _extend({
          path: '/'
        }, api.defaults, attributes);

        if (typeof _attributes.expires === 'number') {
          var expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + _attributes.expires * 864e5);
          _attributes.expires = expires;
        }

        var _value = value;

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

        var _key = encodeURIComponent(String(key));

        var __key = _key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);

        var ___key = __key.replace(/[\(\)]/g, escape);

        var _cookie = document.cookie = [___key, '=', value, attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '', attributes.path ? '; path=' + attributes.path : '', attributes.domain ? '; domain=' + attributes.domain : '', attributes.secure ? '; secure' : ''].join('');

        return _cookie;
      }

      if (!key) {
        result = {};
      }

      var cookies = document.cookie ? document.cookie.split('; ') : [];
      var setDecode = /(%[0-9A-Z]{2})+/g;
      var i = 0;

      for (; i < cookies.length; i++) {
        var parts = cookies[i].split('=');

        var _cookie2 = parts.slice(1).join('=');

        if (_cookie2.charAt(0) === '"') {
          _cookie2 = _cookie2.slice(1, -1);
        }

        try {
          var name = parts[0].replace(setDecode, decodeURIComponent);
          _cookie2 = converter.read ? converter.read(_cookie2, name) : converter(_cookie2, name) || _cookie2.replace(setDecode, decodeURIComponent);

          try {
            _cookie2 = JSON.parse(_cookie2);
          } catch (e) {
            console.log(e);
          }

          if (key === name) {
            result = _cookie2;
            break;
          }

          if (!key) {
            result[name] = _cookie2;
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

module.exports = cookie;
