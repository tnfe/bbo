function fill0(num) {
  let _num = parseFloat(num);
  return _num < 10 ? '0' + _num : _num;
}

const chainAsync = (fns) => {
  let curr = 0;
  const last = fns[fns.length - 1];
  const next = () => {
    const fn = fns[curr++];
    fn === last ? fn() : fn(next);
  };
  next();
};

export { fill0, chainAsync };
