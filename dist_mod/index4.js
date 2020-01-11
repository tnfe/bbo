'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// const ua = (lower) => {
//   return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
// };
function ua(lower) {
  return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
}
/**
 * detect IOS
 * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * more see:
 * https://github.com/madrobby/zepto/blob/master/src/detect.js#files
 */


var isIOS = () => {
  return /iPad|iPhone|iPod/.test(ua());
};

var isiPhone = () => {
  return /iPhone/.test(ua());
};

var isIPad = () => {
  return /iPad/.test(ua());
};
/**
 * detect Android
 * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
 */


var isAndroid = () => {
  return ua('l').indexOf('android') > -1;
};
/**
 * detect PC / Mobile
 * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
 */


var isMobile = () => {
  return /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua('l'));
};

var isPC = () => {
  return !isMobile();
};

var isWeixin = () => {
  return /MicroMessenger/i.test(ua('l')); // 微信
};

var isNewsApp = () => {
  return /qqnews/.test(ua()); // 腾讯新闻app
};

var mqqbrowser = () => {
  return /mqqbrowser\//.test(ua()); // QQ浏览器
};

var isQQ = () => {
  return /qq\//.test(ua()); // 手机QQ
};

var isTenvideo = () => {
  return /qqlivebrowser/.test(ua()); // 腾讯视频
};

var isIphoneXmodel = () => {
  // X XS, XS Max, XR
  var xSeriesConfig = [{
    devicePixelRatio: 3,
    width: 375,
    height: 812
  }, {
    devicePixelRatio: 3,
    width: 414,
    height: 896
  }, {
    devicePixelRatio: 2,
    width: 414,
    height: 896
  }];

  if (typeof window !== 'undefined' && window) {
    var _window = window,
        devicePixelRatio = _window.devicePixelRatio,
        screen = _window.screen;
    var width = screen.width,
        height = screen.height;
    return xSeriesConfig.some(item => item.devicePixelRatio === devicePixelRatio && item.width === width && item.height === height);
  }

  return false;
};

var isIE = () => {
  return ieVersion() > 0;
};
/**
 * ie version
 * From https://codepen.io/gapcode/pen/vEJNZN
 * IE 10 ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';
 * IE 11 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';
 * Edge 12 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';
 * Edge 13 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';
 */


var ieVersion = () => {
  var uakit = ua();
  var msie = uakit.indexOf('MSIE ');

  if (msie > 0) {
    return parseInt(uakit.substring(msie + 5, uakit.indexOf('.', msie)), 10);
  }

  var trident = uakit.indexOf('Trident/');

  if (trident > 0) {
    var rv = uakit.indexOf('rv:');
    return parseInt(uakit.substring(rv + 3, uakit.indexOf('.', rv)), 10);
  }

  var edge = uakit.indexOf('Edge/');

  if (edge > 0) {
    return parseInt(ua.substring(edge + 5, uakit.indexOf('.', edge)), 10);
  }

  return '';
};

exports.ieVersion = ieVersion;
exports.isAndroid = isAndroid;
exports.isIE = isIE;
exports.isIOS = isIOS;
exports.isIPad = isIPad;
exports.isIphoneXmodel = isIphoneXmodel;
exports.isMobile = isMobile;
exports.isNewsApp = isNewsApp;
exports.isPC = isPC;
exports.isQQ = isQQ;
exports.isTenvideo = isTenvideo;
exports.isWeixin = isWeixin;
exports.isiPhone = isiPhone;
exports.mqqbrowser = mqqbrowser;
exports.ua = ua;
