/**
 * Gets all the formal parameter names of a function
 * https://www.zhihu.com/question/28912825
 */
export default function paramsName(fn) {
  return /\(\s*([\s\S]*?)\s*\)/.exec(fn.toString())[1].split(/\s*,\s*/);
}
