const show = (...el) =>
  [...el].forEach((e) => {
    e.style.display = '';
  });

export default show;
