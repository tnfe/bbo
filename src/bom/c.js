import attr from './attr';

// eslint-disable-next-line max-params
export default function c(t, cn, i, id) {
  let el = document.createElement(t);
  if (cn) {
    attr(el, 'class', cn);
  }
  if (i) {
    el.innerHTML = i;
  }
  if (id) {
    attr(el, 'id', id);
  }
  return el;
}
