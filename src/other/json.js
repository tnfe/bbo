import { isTypeof } from '../other/index';
/**
 * to json
 */

// 计算表达式的值 hack
function evil(fn) {
  let Fn = Function; // 一个变量指向Function，防止有些前端编译工具报错
  return new Fn('return ' + fn)();
}

function toJson(res) {
  if (!res) return null;

  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      return evil('(' + res + ')');
    }
  } else if (isTypeof(res.json, 'function')) {
    return res.json();
  } else {
    return res;
  }
}

export { toJson };
