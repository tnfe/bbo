/**
 * 数组方法
 * 可根据lodash understand handlebars调整优化
 *  */
let array = {
  // 数组去重
  unique: function(target) {
    let res = [];
    for (let i = 0, len = target.length; i < len; i++) {
      let current = target[i];
      if (res.indexOf(current) === -1) {
        res.push(current);
      }
    }
    return res;
  },
  // 在数组中随机取一个
  random: function(target) {
    return target[Math.floor(Math.random() * target.length)];
  },
  // 打乱数组返回新数组
  shuffle: function(target) {
    let m = target.length;
    while (m > 1) {
      let index = Math.floor(Math.random() * m--);
      [target[m], target[index]] = [target[index], target[m]];
    }
    return target;
  },
  equal: function(arr1, arr2) {
    if (arr1 === arr2) return true;
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; ++i) {
      if (arr1[i] !== arr2[i]) return false;
    }
    return true;
  },
  // 是否包含指定元素
  contains: function(target, item) {
    return target.indexOf(item) > -1;
  },
  // 在参数1中删除参数2指定位的元素返回布尔
  removeAt: function(target, index) {
    return !!target.splice(index, 1).length;
  },
  // 在参数1中删除参数2返回布尔
  remove: function(target, item) {
    let index = target.indexOf(item);
    return index > -1 ? this.removeAt(target, index) : false;
  },
  // 去除数组中的undefined和Null
  compact: function(target) {
    return target.filter(function(item) {
      return item !== undefined;
    });
  },
  // 获取数组对象中的属性值，组合成新数组
  pluck: function(target, name) {
    let result = [];
    let temp;
    target.forEach(function(item) {
      temp = item[name];
      if (temp !== null) {
        result.push(temp);
      }
    });
    return result;
  },
  // 2个数组的并集
  union: function(t1, t2) {
    return this.unique(t1.concat(t2));
  },
  // 取2个数组的交集
  intersect: function(t1, t2) {
    return t1.filter(function(item) {
      return t2.indexOf(item) !== -1;
    });
  },
  // 取差集
  diff: function(t1, t2) {
    let r = t1;
    for (let i = 0; i < t1.length; i++) {
      for (let j = 0; j < t2.length; j++) {
        if (r[i] === t2[j]) {
          r.splice(i, 1);
          i--;
          break;
        }
      }
    }
    return r;
  },
  // max
  max: function(target) {
    return Math.max.apply(0, target);
  },
  // min
  min: function(target) {
    return Math.min.apply(0, target);
  }
};

export { array };
