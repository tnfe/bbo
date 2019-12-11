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
};

// const getURLParameters = (url) =>
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
};

// bbo.deleteUrlParam = bbo.delUrlParam
const deleteUrlParam = (param, url = window.location.href) => {
  // prefer to use l.search if you have a location/link object
  let urlparts = url.split('?');
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
    return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
  } else {
    return url;
  }
};

const objectParam = (arr) => {
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
};

const objectBigParam = (obj) => {
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

export { getUrlParam, setUrlParam, deleteUrlParam, objectParam, httpGet, httpPost };
