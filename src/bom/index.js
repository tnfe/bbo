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
  let el = document.createElement(t); // t就是创建的标签
  if (cn) {
    el.setAttribute('class', cn); // 给t标签添加cn这个类
  }
  if (i) {
    el.innerHTML = i; // 把新建的标签t的html文本赋值给i
  }
  if (id) {
    el.setAttribute('id', id); // 给标签添加一个id
  }
  return el;
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

export { open, trigger, stopPropagation, g, gc, c };
