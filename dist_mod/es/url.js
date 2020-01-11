/************************************************************************
 * About Url Params
 *************************************************************************/

/**
 * getUrlParam / deleteUrlParam
 * From https://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 */
var getUrlParam = function (name) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  name.replace(/[\[\]]/g, '\\$&');
  var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
  var results = regex.exec(url);
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


var setUrlParam = function (key, value) {
  var url = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : window.location.href;
  var re = new RegExp('([?|&])' + key + '=.*?(&|#|$)', 'i');

  if (url.match(re)) {
    return url.replace(re, '$1' + key + '=' + encodeURIComponent(value) + '$2');
  } else {
    var hash = '';

    if (url.indexOf('#') !== -1) {
      hash = url.replace(/.*#/, '#');
      url.replace(/#.*/, '');
    }

    var separator = url.indexOf('?') !== -1 ? '&' : '?';
    return url + separator + key + '=' + encodeURIComponent(value) + hash;
  }
}; // bbo.deleteUrlParam = bbo.delUrlParam


var deleteUrlParam = function (param) {
  var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : window.location.href;
  // prefer to use l.search if you have a location/link object
  var urlparts = url.split('?');

  if (urlparts.length >= 2) {
    var prefix = encodeURIComponent(param) + '=';
    var pars = urlparts[1].split(/[&;]/g); // reverse iteration as may be destructive

    for (var i = pars.length; i-- > 0;) {
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

var objectParam = arr => {
  var str = '';

  if (Array.isArray(arr)) {
    str = arr.map(function (item) {
      return item.name + '=' + item.value;
    }).join('&');
  } else {
    str = objectParam(objectBigParam(arr));
  }

  return str;
};

var objectBigParam = obj => {
  var arr = [];
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

var httpGet = function (url, callback) {
  var err = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console.error;
  var request = new XMLHttpRequest();
  request.open('GET', url, true);

  request.onload = () => callback(request.responseText);

  request.onerror = () => err(request);

  request.send();
}; // eslint-disable-next-line max-params


var httpPost = function (url, data, callback) {
  var err = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : console.error;
  var request = new XMLHttpRequest();
  request.open('POST', url, true);
  request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

  request.onload = () => callback(request.responseText);

  request.onerror = () => err(request);

  request.send(data);
};

export { deleteUrlParam, getUrlParam, httpGet, httpPost, objectParam, setUrlParam };
