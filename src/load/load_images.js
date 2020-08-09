import isFunction from '../lodash/is_function';
import isObject from '../lodash/is_object';
import size from '../collection/size';

export default function loadImages(options) {
  let len = 0;
  let index = 0;
  let curIndex = 0;
  let stepTimer = null;
  let stepTimeValue = 5;
  let percentageValue = 0;
  let targetPercent = 0;
  let data = options.data || [];
  let step = options.step || function() {};
  let complete = options.complete || function() {};
  let needOneStep = options.needOneStep || false;
  let path = options.path || false;

  if (!isObject(data) || size(data) === 0) {
    step(100);
    return false;
  }

  len = size(data);
  if (path) {
    for (let i = len - 1; i > -1; i--) {
      data[i] = path + data[i];
      // console.info(data[i]);
    }
  }

  let processStep = function() {
    percentageValue++;
    // console.info("processStep = ",percentageValue)
    step(percentageValue);
    if (percentageValue < targetPercent) {
      stepTimer = setTimeout(function() {
        processStep();
      }, stepTimeValue);
    } else if (targetPercent === 100 && percentageValue === targetPercent) {
      if (complete && isFunction(complete)) {
        complete();
      }
    }
  };

  function onload() {
    curIndex++;
    targetPercent = Math.floor((curIndex / len) * 100);
    if (needOneStep) {
      if (stepTimer) {
        clearTimeout(stepTimer);
      }
      processStep();
    } else {
      step(targetPercent);
      if (targetPercent === 100) {
        complete();
      }
    }
  }

  for (index; index < len; index++) {
    let strUrl = data[index];
    new LoadImageItem(strUrl, onload).start();
  }
}

/**
 * @name loadImageItem
 * @param  {string} url - images full url
 * @callback cb - called when load image completed
 */
function LoadImageItem(url, cb) {
  let self = this;

  self.img = new Image();

  // readyState:'complete' or 'loaded' => image has been loaded。
  // for IE6-IE10。
  let onReadyStateChange = function() {
    removeEventHandlers();
    console.info('onReadyStateChange');
    cb(self, 'onReadyStateChange');
  };

  let onError = function() {
    console.info('onError');
    removeEventHandlers();
    cb(self, 'onError');
  };

  let onLoad = function() {
    removeEventHandlers();
    cb(self, 'onload');
  };

  let removeEventHandlers = function() {
    self.unbind('load', onLoad);
    self.unbind('readystatechange', onReadyStateChange);
    self.unbind('error', onError);
  };

  this.start = function() {
    this.bind('load', onLoad);
    this.bind('readystatechange', onReadyStateChange);
    this.bind('error', onError);

    this.img.src = url;
    if (self.img.complete) {
      removeEventHandlers();
      cb(this, 'onload');
    }
  };
}

/**
 * @name bind
 * @description cross-browser event binding
 * @param  {string} eventName
 * @param  {function} eventHandler
 */
LoadImageItem.prototype.bind = function(eventName, eventHandler) {
  if (this.img.addEventListener) {
    this.img.addEventListener(eventName, eventHandler, false);
  } else if (this.img.attachEvent) {
    this.img.attachEvent('on' + eventName, eventHandler);
  }
};

/**
 * @name unbind
 * @description cross-browser event un-binding
 * @param  {string} eventName
 * @param  {function} eventHandler
 */

LoadImageItem.prototype.unbind = function(eventName, eventHandler) {
  if (this.img.removeEventListener) {
    this.img.removeEventListener(eventName, eventHandler, false);
  } else if (this.img.detachEvent) {
    this.img.detachEvent('on' + eventName, eventHandler);
  }
};
