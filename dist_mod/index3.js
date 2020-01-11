'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _rollupPluginBabelHelpers = require('./internal/_rollupPluginBabelHelpers.js');

/************************************************************************
 * Bom and Dom
 *************************************************************************/

/**
 * open new url dont not blocked by browser
 */
var open = href => {
  var id = '_bbo_open_proxy';
  var a = g(id) || c('a', id, '', id);
  setStyle(a, 'display', 'none');
  attr(a, 'href', href);
  attr(a, 'target', '_blank');
  if (!a.parentNode) document.body.appendChild(a);
  trigger(a, 'click', 'MouseEvents');
};
/**
 * trigger event
 * https://stackoverflow.com/questions/2490825/how-to-trigger-event-in-javascript
 */


var trigger = (element, event, eventType) => {
  if (document.createEventObject) {
    var e = document.createEventObject();
    return element.fireEvent('on' + event, e);
  } else {
    var _e2 = document.createEvent(eventType || 'HTMLEvents');

    _e2.initEvent(event, true, true);

    element.dispatchEvent(_e2);
  }
};

var stopPropagation = e => {
  var _e = e || window.event;

  if (_e.stopPropagation) {
    _e.stopPropagation(); // W3C

  } else {
    _e.cancelBubble = true; // IE
  }
};

var g = i => {
  return document.getElementById(i);
};

var gc = cn => {
  return document.getElementsByClassName(cn);
}; // eslint-disable-next-line max-params


var c = (t, cn, i, id) => {
  var el = document.createElement(t);

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
};

var query = i => {
  return document.querySelector(i);
};

var copyToClipboard = str => {
  var el = document.createElement('textarea');
  el.value = str;
  attr(el, 'readonly', '');
  setStyle(el, 'position', 'absolute');
  setStyle(el, 'left', '-9999px');
  document.body.appendChild(el);
  var selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);

  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
};

var show = function () {
  for (var _len = arguments.length, el = new Array(_len), _key = 0; _key < _len; _key++) {
    el[_key] = arguments[_key];
  }

  return [].concat(el).forEach(e => {
    e.style.display = '';
  });
};

var hide = function () {
  for (var _len2 = arguments.length, el = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    el[_key2] = arguments[_key2];
  }

  return [].concat(el).forEach(e => {
    e.style.display = 'none';
  });
};

var elementContains = (parent, child) => parent !== child && parent.contains(child);

var formToObject = form => Array.from(new FormData(form)).reduce((acc, _ref) => {
  var _ref2 = _rollupPluginBabelHelpers._slicedToArray(_ref, 2),
      key = _ref2[0],
      value = _ref2[1];

  return { ...acc,
    [key]: value
  };
}, {});

var getStyle = (el, ruleName) => getComputedStyle(el)[ruleName];

var setStyle = (el, ruleName, val) => {
  el.style[ruleName] = val;
};

var attr = (el, ruleName, val) => {
  el.setAttribute(ruleName, val);
};

exports.attr = attr;
exports.c = c;
exports.copyToClipboard = copyToClipboard;
exports.elementContains = elementContains;
exports.formToObject = formToObject;
exports.g = g;
exports.gc = gc;
exports.getStyle = getStyle;
exports.hide = hide;
exports.open = open;
exports.query = query;
exports.setStyle = setStyle;
exports.show = show;
exports.stopPropagation = stopPropagation;
exports.trigger = trigger;
