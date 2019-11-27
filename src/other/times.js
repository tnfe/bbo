import { args } from '../arguments/index';
import { fill0 } from '../fill/index';
/**
 * setInterval func fix times
 * https://stackoverflow.com/questions/2956966/javascript-telling-setinterval-to-only-fire-x-amount-of-times
 */
function setTimesout() {
  let func = arguments[0];
  let delay = arguments[1] === undefined ? 0 : parseFloat(arguments[1]);
  let times = arguments[2] === undefined ? 1 : parseInt(arguments[2], 10);
  let _args = arguments.length > 3 ? args(arguments, 3) : null;
  let target = {
    index: 0,
    times: times,
    over: false
  };

  let id = setInterval(function() {
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
function getDate(d1, d2) {
  let today = new Date();

  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let hh = today.getHours();
  let ms = today.getMinutes();
  let ss = today.getSeconds();

  dd = fill0(dd);
  mm = fill0(mm);
  hh = fill0(hh);
  ms = fill0(ms);
  ss = fill0(ss);

  let _d1 = d1 || '/';
  let _d2 = d2 || ':';

  return yyyy + _d1 + mm + _d1 + dd + ' ' + hh + _d2 + ms + _d2 + ss;
}

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
function formatPassTime(startTime) {
  let currentTime = Date.parse(new Date());
  let time = currentTime - startTime;
  let day = parseInt(time / (1000 * 60 * 60 * 24), 10);
  let hour = parseInt(time / (1000 * 60 * 60), 10);
  let min = parseInt(time / (1000 * 60), 10);
  let month = parseInt(day / 30, 10);
  let year = parseInt(month / 12, 10);
  if (year) return year + '年前';
  if (month) return month + '个月前';
  if (day) return day + '天前';
  if (hour) return hour + '小时前';
  if (min) return min + '分钟前';
  else return '刚刚';
}

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
function formatRemainTime(endTime) {
  let startDate = new Date(); // 开始时间
  let endDate = new Date(endTime); // 结束时间
  let t = endDate.getTime() - startDate.getTime(); // 时间差
  let d = 0;
  let h = 0;
  let m = 0;
  let s = 0;
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24);
    h = Math.floor((t / 1000 / 60 / 60) % 24);
    m = Math.floor((t / 1000 / 60) % 60);
    s = Math.floor((t / 1000) % 60);
  }
  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
}

export { setTimesout, clearTimesout, getDate, formatPassTime, formatRemainTime };
