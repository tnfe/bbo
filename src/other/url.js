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
}

// bbo.deleteUrlParam = bbo.delUrlParam
function deleteUrlParam(param, url) {
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
}

function objectParam(arr) {
  let str = '';
  if (Array.isArray(arr)) {
    str = arr
      .map(function(item) {
        return item.name + '=' + item.value;
      })
      .join('&');
  } else {
    str = objectParam(objectBigParam(arr));
  }
  return str;
}

function objectBigParam(obj) {
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
}

export { getUrlParam, setUrlParam, deleteUrlParam, objectParam };
