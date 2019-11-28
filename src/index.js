import { version } from '../package.json';

import {
  ua,
  isIOS,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  mqqbrowser
} from './detecting/index';

import { log, logs, removeConsole } from './log/index';

import { args, trash, noop } from './arguments/index';

import { open, trigger, stopPropagation, g, gc, c } from './bom/index';

import { uuid, hash, judge, getType, isTypeof, construct, paramsName } from './other/index';
import { loadImages, loadjs, loadcss } from './other/load';
import { toJson } from './other/json';
import { cookie, setCookie, getCookie, deleteCookie } from './other/cookie';
import { getUrlParam, setUrlParam, deleteUrlParam, objectParam } from './other/url';

import {
  setTimesout,
  clearTimesout,
  getDate,
  formatPassTime,
  formatRemainTime
} from './other/times';

import { fill0 } from './fill/index';

import { randomColor, randomFromArray, randomA2B, randomKey, floor } from './random/index';

import { lockTouch } from './touch/index';

import { checkImageSize, imageOptimization } from './image/index';

import {
  getTag,
  hasOwnProperty,
  isObject,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isMap,
  isSet,
  isFunction,
  isEmpty,
  isShallowEqual,
  has,
  reduce,
  forEach,
  map,
  findIndex,
  find,
  toPath,
  get,
  debounce,
  throttle,
  pick,
  omit
} from './lodash/index';

/**
 * Main entry
 */

let bbo = {
  // version
  version,
  // detecting
  ua,
  isIOS,
  isIos: isIOS,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  mqqbrowser,
  // log
  log,
  logs,
  removeConsole,
  // arguments
  args,
  trash,
  noop,
  // bom
  open,
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  // other
  uuid,
  hash,
  judge,
  getType,
  isTypeof,
  construct,
  paramsName,
  // other function
  loadImages,
  loadjs,
  loadcss,
  toJson,
  // cookie
  cookie,
  setCookie,
  getCookie,
  deleteCookie,
  // url
  getUrlParam,
  setUrlParam,
  deleteUrlParam,
  objectParam,
  // times
  setTimesout,
  clearTimesout,
  getDate,
  formatPassTime,
  formatRemainTime,
  // fill
  fill0,
  // random
  randomColor,
  randomFromArray,
  randomA2B,
  randomKey,
  floor,
  // touch
  lockTouch,
  // image
  checkImageSize,
  imageOptimization,
  // lodash
  getTag,
  hasOwnProperty,
  isObject,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isMap,
  isSet,
  isFunction,
  isEmpty,
  isShallowEqual,
  has,
  reduce,
  forEach,
  map,
  findIndex,
  find,
  toPath,
  get,
  debounce,
  throttle,
  pick,
  omit
};

export default bbo;
