/**
 * setCookie / getCookie / deleteCookie
 * From https://stackoverflow.com/questions/1458724/how-do-i-set-unset-cookie-with-jquery/1458728#1458728
 */
const setCookie = (name, value, option) => {
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

export default setCookie;
