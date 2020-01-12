const hide = (...el) =>
  [...el].forEach((e) => {
    e.style.display = 'none';
  });

export default hide;
