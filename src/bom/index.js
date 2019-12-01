/************************************************************************
 * Bom and Dom
 *************************************************************************/
/**
 * open new url dont not blocked by browser
 */
function open(href) {
  let id = '_bbo_open_proxy';
  let a = document.getElementById(id) || document.createElement('a');
  a.setAttribute('id', id);
  a.setAttribute('href', href);
  a.setAttribute('target', '_blank');
  a.style.display = 'none';

  if (!a.parentNode) document.body.appendChild(a);
  trigger(a, 'click', 'MouseEvents');
}

function stopPropagation(e) {
  let _e = e || window.event;
  if (_e.stopPropagation) {
    _e.stopPropagation(); // W3C
  } else {
    _e.cancelBubble = true; // IE
  }
}

function g(i) {
  return document.getElementById(i);
}

function gc(cn) {
  return document.getElementsByClassName(cn);
}

function c(t, cn, i, id) {
  let el = document.createElement(t);
  if (cn) {
    el.setAttribute('class', cn);
  }
  if (i) {
    el.innerHTML = i;
  }
  if (id) {
    el.setAttribute('id', id);
  }
  return el;
}

function query(i) {
  return document.querySelector(i);
}

/**
 * trigger event
 * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
 */
function trigger(element, event, eventType) {
  if (document.createEventObject) {
    let e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  } else {
    let e = document.createEvent(eventType || 'HTMLEvents');
    e.initEvent(event, true, true);
    element.dispatchEvent(e);
  }
}

const copyToClipboard = (str) => {
  const el = document.createElement('textarea');
  el.value = str;
  el.setAttribute('readonly', '');
  el.style.position = 'absolute';
  el.style.left = '-9999px';
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

const show = (...el) =>
  [...el].forEach((e) => {
    e.style.display = '';
  });

const hide = (...el) =>
  [...el].forEach((e) => {
    e.style.display = 'none';
  });

const elementContains = (parent, child) => parent !== child && parent.contains(child);

const formToObject = (form) =>
  Array.from(new FormData(form)).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value
    }),
    {}
  );

const getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

const setStyle = (el, ruleName, val) => {
  el.style[ruleName] = val;
};

export {
  open,
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  query,
  show,
  hide,
  copyToClipboard,
  elementContains,
  formToObject,
  getStyle,
  setStyle
};
