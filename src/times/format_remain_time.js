/**
 * @desc   format the remaining time from ${endTime}
 * @param  {Date} endTime
 * @return {String}
 */
const formatRemainTime = (endTime) => {
  let startDate = new Date(); // startDate
  let endDate = new Date(endTime); // endDate
  let t = endDate.getTime() - startDate.getTime();
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
  return d + 'day ' + h + 'hour ' + m + 'minute ' + s + 'second';
};

export default formatRemainTime;
