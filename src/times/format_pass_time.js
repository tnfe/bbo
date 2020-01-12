/**
 * @ zh_cn
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime
 * @return {String}
 */
const formatPassTime = (startTime) => {
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
};

export default formatPassTime;
