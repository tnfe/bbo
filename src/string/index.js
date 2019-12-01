/**
 * String
 */
let string = {
  /**
   * Remove spaces after removing previous string
   */
  trim: (str) => {
    let _str = str.replace(/^\s+/, '');
    for (let i = str.length - 1; i >= 0; i--) {
      if (/\S/.test(str.charAt(i))) {
        _str = str.slice(0, i + 1);
        break;
      }
    }
    return _str;
  },
  /**
   * Increase by 0 based on string length before string
   */
  fillZero: (target, n) => {
    let z = new Array(n).join('0');
    let str = z + target;
    let result = str.slice(-n);
    return result;
  },
  /**
   * Long string unique
   */
  longUnique: (target) => {
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

  /**
   * Remove the html tags inside the script
   */
  stripTags: (target) => {
    return target.replace(/<script[^>]*>(\S\s*?)<\/script>/gim, '').replace(/<[^>]+>/g, '');
  },
  /**
   * Capitalizes the first letter of a string.
   */
  capitalize: (target) => {
    return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
  },
  /**
   * DeCapitalizes the first letter of a string.
   */
  deCapitalize: ([first, ...rest], upperRest = false) =>
    first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join('')),
  /**
   * en:Returns true if the given string is an absolute URL, false otherwise.
   */
  isAbsoluteURL: (str) => /^[a-z][a-z0-9+.-]*:/.test(str),
  /**
   * Creates a new string with the results of calling a provided function
   * on every character in the calling string.
   */
  mapString: (str, fn) =>
    str
      .split('')
      .map((c, i) => fn(c, i, str))
      .join(''),
  /**
   * Replaces all but the last num of characters with the specified mask character.
   */
  mask: (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask),
  /**
   * splitLines('This\nis a\nmultiline\nstring.\n') =>
   * ['This', 'is a', 'multiline', 'string.' , '']
   */
  splitLines: (str) => str.split(/\r?\n/),
  /**
   * _ or - to CamelCase
   */
  camelize: (target) => {
    if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
      return target;
    }
    return target.replace(/[-_][^-_]/g, function(match) {
      return match.charAt(1).toUpperCase();
    });
  },
  /**
   * Turn CamelCase to '_'
   */
  underscored: (target) => {
    return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
  },

  /**
   * Turn '_' in a string into '-'
   */
  dasherize: function(target) {
    return this.underscored(target).replace(/_/g, '-');
  },

  /**
   * Truncates a string up to a specified length.
   * The default length is 3, and the truncated symbol defaults '...'
   */
  truncate: (str, num) => (str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str),

  /**
   * Returns the length of a string in bytes.
   */
  byteSize: (str) => new Blob([str]).size,

  /**
   * Returns the length of a string in bytes by Unicode (utf-8 utf8 utf-16 utf16)
   */
  byteLen: (str, charset) => {
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
  /**
   * Repeat item, times times
   */
  repeat: (item, times) => {
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
  /**
   * Item is the end of the target
   */
  endsWith: (target, item, ignore) => {
    let str = target.slice(-item.length);
    return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
  },

  /**
   *  Item is the beginning of the target
   */
  startsWith: (target, item, ignore) => {
    let str = target.slice(0, item.length);
    return ignore ? str.toLowerCase() === item.toLowerCase() : str === item;
  },

  /**
   * Whether a string contains another string
   */
  contains: (target, item) => {
    return target.indexOf(item) !== -1;
    // return target.indexOf(item) > -1;
  },

  /**
   * XSS string filtering
   */
  xssFilter: (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;');
  }
};

export { string };
