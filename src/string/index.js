/**
 * 字符串
 */
let string = {
  // 去空格
  trim: function(str) {
    let _str = str.replace(/^\s+/, '');
    for (let i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        _str = str.slice(0, i + 1);
        break;
      }
    }
    return _str;
  },
  print: function(str, object) {
    // 模仿C语言print方法
    let arr = [].slice.call(arguments, 1);
    let index;
    return str.replace(/#{([^{}]+)}/gm, function(match, name) {
      index = Number(name);
      if (index >= 0) {
        return arr[index];
      }
      if (object && object[name] !== '') {
        return object[name];
      }
      return '';
    });
  },
  // 补零
  fillZero: function(target, n) {
    let z = new Array(n).join('0');
    let str = z + target;
    let result = str.slice(-n);
    return result;
  },
  // 字符串去重
  longUnique: function(target) {
    let json = {};
    for (let index = 0; index < target.length; index++) {
      if (!json[target[index]]) {
        json[target[index]] = -1;
      }
    }

    let longString = '';
    for (let index = 0; index < target.length; index++) {
      if (json[target[index]]) {
        json[target[index]] = 0;
        longString = longString + target[index];
      }
    }

    return longString;
  },
  // 去掉script内部的html标签
  stripTags: function(target) {
    return target.replace(/<script[^>]*>(\S\s*?)<\/script>/gim, '').replace(/<[^>]+>/g, '');
  },
  // 首字母大写
  capitalize: function(target) {
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  },
  // _ - 转驼峰命名
  camelize: function(target) {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
      return target;
    }
    return target.replace(/[-_][^-_]/g, function(match) {
      // console.log(match) 匹配测试
      return match.charAt(1).toUpperCase();
    });
  },
  // 把驼峰转换成_
  underscored: function(target) {
    return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  },
  // 把字符串中的_转成-
  dasherize: function(target) {
    return this.underscored(target).replace(/_/g, '-');
  },
  // 字符串截断方法 目标 长度默认30，截断后符号默认...
  truncate: function(target, len, truncation) {
    let _len = len || 30;
    let _truncation = truncation ? truncation : '...';
    return target.length > _len
      ? target.slice(0, len - _truncation.length) + _truncation
      : target.toString();
  },
  // 获得字符串字节长度 参数2 utf-8 utf8 utf-16 utf16
  byteLen: function(str, charset) {
    let target = 0;
    let charCode;
    let i;
    let len;
    let _charset = charset ? charset.toLowerCase() : '';
    if (_charset === 'utf-16' || _charset === 'utf16') {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0xffff) {
          target += 2;
        } else {
          target += 4;
        }
      }
    } else {
      for (i = 0, len = str.length; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode <= 0x007f) {
          target += 1;
        } else if (charCode <= 0x07ff) {
          target += 2;
        } else if (charCode <= 0xffff) {
          target += 3;
        } else {
          target += 4;
        }
      }
    }
    return target;
  },
  // 重复item,times次
  repeat: function(item, times) {
    let s = item;
    let target = '';
    while (times > 0) {
      if (times % 2 === 1) {
        target += s;
      }
      if (times === 1) {
        break;
      }
      s += s;
      // eslint-disable-next-line no-param-reassign
      times = times >> 1;
    }
    return target;
  },
  // 参2是参1的结尾么？参数3忽略大小写
  endsWith: function(target, item, ignorecase) {
    let str = target.slice(-item.length);
    return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
  },
  // 参数2是参数1的开头么？参数3忽略大小写
  startsWith: function(target, item, ignorecase) {
    let str = target.slice(0, item.length);
    return ignorecase ? str.toLowerCase() === item.toLowerCase() : str === item;
  },
  // 类名中，参数1 是否包含参数2，类名中的分隔符
  containsClass: function(target, item, separator) {
    return separator
      ? (separator + target + separator).indexOf(separator + item + separator) > -1
      : this.contains(target, item);
  },
  // 判定一个字符串是否包含另一个字符串
  contains: function(target, item) {
    return target.indexOf(item) !== -1;
    // return target.indexOf(item) > -1;
  },
  // XSS 字符过滤
  xssFilter: function(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
};

export { string };
