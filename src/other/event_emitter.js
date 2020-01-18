import isFunction from '../lodash/is_function';
import isObject from '../lodash/is_object';
import findIndex from '../lodash/find_index';

/**
 * function handle1(a, b, c) {
 *   console.log('one', a, b, c);
 * }
 *
 * function handle2(a, b, c) {
 *   console.log('two', a, b, c);
 * }
 *
 * function handle3(a, b, c) {
 *   console.log('three', a, b, c);
 * }
 *
 * emitter
 *   .on('demo', handle1)
 *   .once('demo', handle2)
 *   .on('demo', handle3);
 *
 * emitter.emit('demo', [1, 2, 3]);
 */
export default function EventEmitter() {
  this.__events = {};
}

function isListener(listener) {
  if (isFunction(listener)) {
    return true;
  } else if (listener && isObject(listener)) {
    return isListener(listener.listener);
  } else {
    return false;
  }
}

let prototype = EventEmitter.prototype;

/**
 * on
 * @param  {String} eventName
 * @param  {Function} listener
 * @return {Object}
 */
prototype.on = function(eventName, listener) {
  if (!eventName || !listener) return;

  if (!isListener(listener)) {
    throw new TypeError('listener is a function');
  }

  let events = this.__events;
  let listeners = (events[eventName] = events[eventName] || []);
  let listenerIsWrapped = isObject(listener);

  // not repeat
  if (findIndex(listeners, listener) === -1) {
    let listenerOnce = {
      listener: listener,
      once: false
    };

    listeners.push(listenerIsWrapped ? listener : listenerOnce);
    console.log(listeners);
  }

  return this;
};

/**
 * once
 * @param  {String} eventName
 * @param  {Function} listener
 * @return {Object} can chained call
 */
prototype.once = function(eventName, listener) {
  return this.on(eventName, {
    listener: listener,
    once: true
  });
};

/**
 * off
 * @param  {String} eventName
 * @param  {Function} listener
 * @return {Object}  can chained call
 */
prototype.off = function(eventName, listener) {
  let listeners = this.__events[eventName];
  if (!listeners) return;

  let index;
  for (let i = 0, len = listeners.length; i < len; i++) {
    if (listeners[i] && listeners[i].listener === listener) {
      index = i;
      break;
    }
  }

  if (typeof index !== 'undefined') {
    listeners.splice(index, 1, null);
  }

  return this;
};

/**
 * emit
 * @param  {String} eventName
 * @param  {Array} args
 * @return {Object} can chained call
 */
prototype.emit = function(eventName, args) {
  let listeners = this.__events[eventName];
  if (!listeners) return;

  for (let i = 0; i < listeners.length; i++) {
    let listener = listeners[i];
    if (listener) {
      listener.listener.apply(this, args || []);
      if (listener.once) {
        this.off(eventName, listener.listener);
      }
    }
  }

  return this;
};

/**
 * allOff && allOne
 * @param  {String[]}
 */
prototype.allOff = function(eventName) {
  if (eventName && this.__events[eventName]) {
    this.__events[eventName] = [];
  } else {
    this.__events = {};
  }
};
