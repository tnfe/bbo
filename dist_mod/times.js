'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('./index.js');
var _rollupPluginBabelHelpers = require('./internal/_rollupPluginBabelHelpers.js');
var index$1 = require('./index5.js');

/**
 * setInterval func fix times
 * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
 */

function setTimesout() {
  var func = arguments[0];
  var delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
  var times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);

  var _args = arguments.length > 3 ? index.args(arguments, 3) : null;

  var target = {
    index: 0,
    times: times,
    over: false
  };
  var id = setInterval(function () {
    target.index++;

    if (target.index > times) {
      clearInterval(id);
    } else {
      if (target.index === times) target.over = true;
      func.apply(target, _args);
    }
  }, delay);
  return id;
}

function clearTimesout(id) {
  clearInterval(id);
}
/************************************************************************
 * Date
 *************************************************************************/

/**
 * getDate
 * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
 */


var getDate = (d1, d2) => {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  var hh = today.getHours();
  var ms = today.getMinutes();
  var ss = today.getSeconds();
  dd = index$1.fill0(dd);
  mm = index$1.fill0(mm);
  hh = index$1.fill0(hh);
  ms = index$1.fill0(ms);
  ss = index$1.fill0(ss);

  var _d1 = d1 || '/';

  var _d2 = d2 || ':';

  return yyyy + _d1 + mm + _d1 + dd + ' ' + hh + _d2 + ms + _d2 + ss;
};
/**
 * @ zh_cn
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */


var formatPassTime = startTime => {
  var currentTime = Date.parse(new Date());
  var time = currentTime - startTime;
  var day = parseInt(time / (1000 * 60 * 60 * 24), 10);
  var hour = parseInt(time / (1000 * 60 * 60), 10);
  var min = parseInt(time / (1000 * 60), 10);
  var month = parseInt(day / 30, 10);
  var year = parseInt(month / 12, 10);
  if (year) return year + '年前';
  if (month) return month + '个月前';
  if (day) return day + '天前';
  if (hour) return hour + '小时前';
  if (min) return min + '分钟前';else return '刚刚';
};
/**
 * @ zh_cn
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */


var formatRemainTime = endTime => {
  var startDate = new Date(); // 开始时间

  var endDate = new Date(endTime); // 结束时间

  var t = endDate.getTime() - startDate.getTime(); // 时间差

  var d = 0;
  var h = 0;
  var m = 0;
  var s = 0;

  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor(t / 1000 / 60 / 60 % 24);
    m = Math.floor(t / 1000 / 60 % 60);
    s = Math.floor(t / 1000 % 60);
  }

  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
};
/**
 * @ en
 * bbo.formatDuration(1001); // '1 second, 1 millisecond'
 * bbo.formatDuration(34325055574); // '397 days, 6 hours, 44 minutes, 15 seconds, 574 milliseconds'
 */


var formatDuration = ms => {
  // eslint-disable-next-line no-param-reassign
  if (ms < 0) ms = -ms;
  var time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000
  };
  return Object.entries(time).filter(val => val[1] !== 0).map((_ref) => {
    var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    return `${val} ${key}${val !== 1 ? 's' : ''}`;
  }).join(', ');
};

exports.clearTimesout = clearTimesout;
exports.formatDuration = formatDuration;
exports.formatPassTime = formatPassTime;
exports.formatRemainTime = formatRemainTime;
exports.getDate = getDate;
exports.setTimesout = setTimesout;
