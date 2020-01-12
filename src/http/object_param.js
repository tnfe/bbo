const objectParam = (arr) => {
  let str = '';
  if (Array.isArray(arr)) {
    str = arr
      .map(function(item) {
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
  Object.keys(obj).forEach(function(k) {
    if (Array.isArray(obj[k])) {
      arr = arr.concat(
        obj[k].map(function(v) {
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
