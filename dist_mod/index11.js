'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/************************************************************************
 * Random And Math
 *************************************************************************/
var randomColor = () => {
  return '#' + ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
}; // bbo.randomFromA2B = bbo.randomA2B


var randomA2B = (a, b, int) => {
  var result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

var randomKey = function () {
  var len = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 32;

  /** Removed confusing characters 'oOLl,9gq,Vv,Uu,I1' **/
  var possible = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  var key = '';

  for (var i = 0; i < len; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return key;
};

var floor = function (n) {
  var m = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
};

exports.floor = floor;
exports.randomA2B = randomA2B;
exports.randomColor = randomColor;
exports.randomKey = randomKey;
