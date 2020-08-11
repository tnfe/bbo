export default function fill0(num) {
  let _num = parseFloat(num);
  return _num < 10 ? '0' + _num : String(_num);
}
