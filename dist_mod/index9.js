'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

/************************************************************************
 * Other
 *************************************************************************/

/**
 * generate uuid
 * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
var uuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0;
    var v = c === 'x' ? r : r & 0x3 | 0x8;
    return v.toString(16);
  });
};
/**
 * string hash map
 * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */


var hash = str => {
  var _str = String(str);

  var hash = 0;
  var i;
  var chr;
  if (_str.length === 0) return hash;

  for (i = 0; i < _str.length; i++) {
    chr = _str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
};
/**
 * map condition judge
 *  bbo.judge = bbo.judgment
 */


var judge = (v, vals, strict) => {
  if (!isTypeof(vals, 'array')) return false;

  for (var key in vals) {
    if (strict) {
      if (v === vals[key]) return true;
    } else {
      if (v === vals[key]) return true;
    }
  }

  return false;
};
/**
 * is typeof type
 */


var isTypeof = (val, type) => {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === type;
};

var getType = v => v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

function construct() {
  var classs = arguments[0];
  return new (Function.prototype.bind.apply(classs, arguments))();
}
/**
 * Gets all the formal parameter names of a function
 * https://www.zhihu.com/question/28912825
 */


function paramsName(fn) {
  return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
}

exports.construct = construct;
exports.getType = getType;
exports.hash = hash;
exports.isTypeof = isTypeof;
exports.judge = judge;
exports.paramsName = paramsName;
exports.uuid = uuid;
