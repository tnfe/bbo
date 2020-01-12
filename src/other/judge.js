import isTypeof from './is_typeof';
/**
 * map condition judge
 *  bbo.judge = bbo.judgment
 */
export default function judge(v, vals, strict) {
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
