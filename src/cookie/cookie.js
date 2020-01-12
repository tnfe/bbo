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
          cookie = converter.read
            ? converter.read(cookie, name)
            : converter(cookie, name) || cookie.replace(setDecode, decodeURIComponent);

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

export default cookie;
