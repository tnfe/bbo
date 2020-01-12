import fill0 from '../fill/fill0';

/**
 * getDate
 * https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
 */
const getDate = (d1, d2) => {
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
};

export default getDate;
