/**
 * setUrlParam
 * From https://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
 */
const setUrlParam = (key, value, uri = window.location.href) => {
  let re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  let separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
};

export default setUrlParam;
