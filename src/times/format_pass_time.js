/**
 * @param  {Date} startTime timestamp
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
  if (year) return year + 'years ago';
  if (month) return month + 'months ago';
  if (day) return day + 'days ago';
  if (hour) return hour + 'hours ago';
  if (min) return min + 'minutes ago';
  else return 'just now';
};

export default formatPassTime;
