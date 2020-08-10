import isArray from '../lodash/is_array';
const objectParam = (arr) => {
  let str = '';
  if (isArray(arr)) {
    str = arr
      .map((item) => {
        return item.name + '=' + item.value;
      })
      .join('&');
  } else {
    str = objectParam(objectBigParam(arr));
  }
  return str;
};

const objectBigParam = (obj) => {
  let arr = [];
  Object.keys(obj).forEach((k) => {
    if (isArray(obj[k])) {
      arr = arr.concat(
        obj[k].map((v) => {
          return {
            name: k,
            value: v
          };
        })
      );
    } else {
      arr.push({
        name: k,
        value: obj[k]
      });
    }
  });
  return arr;
};

export default objectParam;
