/************************************************************************
 * Other
 *************************************************************************/
/**
 * generate uuid
 * From https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 */
function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0;
    let v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * string hash map
 * From https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
 */
function hash(str) {
  let _str = String(str);
  let hash = 0;
  let i;
  let chr;
  if (_str.length === 0) return hash;
  for (i = 0; i < _str.length; i++) {
    chr = _str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return hash;
}

/**
 * map condition judge
 *  ppo.judge = ppo.judgment
 */
function judge(v, vals, strict) {
  if (!isTypeof(vals, 'array')) return false;

  for (let key in vals) {
    if (strict) {
      if (v === vals[key]) return true;
    } else {
      if (v === vals[key]) return true;
    }
  }

  return false;
}

/**
 * is typeof type
 */
function isTypeof(val, type) {
  return (
    Object.prototype.toString
      .call(val)
      .slice(8, -1)
      .toLowerCase() === type
  );
}

function getType(ele) {
  if (!ele) return undefined;
  if (window === document && document !== window) {
    return 'window';
  } else if (ele.nodeType === 9) {
    return 'document';
  } else if (ele.callee) {
    return 'arguments';
  } else if (isFinite(ele.length) && ele.item) {
    return 'nodeList';
  } else {
    let temp = Object.prototype.toString.call(ele);
    let reg = /\[object (.*)\]/;
    let arr = reg.exec(temp);
    return arr[1].toLowerCase();
  }
}

function construct() {
  let classs = arguments[0];
  return new (Function.prototype.bind.apply(classs, arguments))();
}

/**
 * Gets all the formal parameter names of a function
 * https://www.zhihu.com/question/28912825
 */
function paramsName(fn) {
  return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
}

export { uuid, hash, judge, getType, isTypeof, construct, paramsName };
