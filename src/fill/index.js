function fill0(num) {
  let _num = parseFloat(num);
  return _num < 10 ? '0' + _num : _num;
}

export { fill0 };
