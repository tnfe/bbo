/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */

/**
 * bbo.cookie()
 * https://github.com/hrout/onavo/blob/master/onavo.js#L209
 */
import hasOwnProperty from '../args/has_own_property';
import size from '../collection/size';
import isNumber from '../lodash/is_number';

const cookie = () => {
  function cookieAttrExtend() {
    let i = 0;
    let result = {};
    for (; i < arguments.length; i++) {
      let attributes = arguments[i];
      for (let key in attributes) {
        if (hasOwnProperty(attributes, key)) {
          result[key] = attributes[key];
        }
      }
    }
    return result;
  }
  function init(converter) {
    function api(key, value, attributes) {
      let result;
      if (size(arguments) > 1) {
        attributes = cookieAttrExtend(
          {
            path: '/'
          },
          api.defaults,
          attributes
        );

        if (isNumber(attributes.expires)) {
          let expires = new Date();
          expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e5);
          attributes.expires = expires;
        }

        try {
          result = JSON.stringify(value);
          if (/^[\{\[]/.test(result)) {
            value = result;
          }
        } catch (e) {}

        if (!converter.write) {
          value = encodeURIComponent(String(value)).replace(
            /%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,
            decodeURIComponent
          );
        } else {
          value = converter.write(value, key);
        }

        key = encodeURIComponent(String(key));
        key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
        key = key.replace(/[\(\)]/g, escape);

        // eslint-disable-next-line no-return-assign
        return (document.cookie = [
          key,
          '=',
          value,
          attributes.expires ? '; expires=' + attributes.expires.toUTCString() : '',
          attributes.path ? '; path=' + attributes.path : '',
          attributes.domain ? '; domain=' + attributes.domain : '',
          attributes.secure ? '; secure' : ''
        ].join(''));
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

          // eslint-disable-next-line no-invalid-this
          if (this.json) {
            try {
              cookie = JSON.parse(cookie);
            } catch (e) {}
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
    api.getJson = api.getJSON = function() {
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
        cookieAttrExtend(attributes, {
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
