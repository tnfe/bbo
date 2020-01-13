import version from './util/version';
import noConflict from './util/no_conflict';

// device
import ua from './device/ua';
import isIos from './device/is_ios';
import isiPhone from './device/is_iphone';
import isIPad from './device/is_ipad';
import isAndroid from './device/is_android';
import isMobile from './device/is_mobile';
import isPC from './device/is_pc';
import isWeixin from './device/is_weixin';
import isNewsApp from './device/is_news_app';
import isQQ from './device/is_qq';
import mqqbrowser from './device/mqqbrowser';
import isTenvideo from './device/is_tenvideo';
import isIphoneXmodel from './device/is_iphonex_model';
import isIE from './device/is_ie';
import ieVersion from './device/ie_version';

// log
import log from './log/log';
import logs from './log/logs';
import removeConsole from './log/remove_console';

// args
import args from './args/args';
import trash from './args/trash';
import noop from './args/noop';
import merge from './args/merge';
import over from './args/over';
import call from './args/call';

// bom
import open from './bom/open';
import trigger from './bom/trigger';
import stopPropagation from './bom/stop_propagation';
import g from './bom/g';
import gc from './bom/gc';
import c from './bom/c';
import query from './bom/query';
import show from './bom/show';
import hide from './bom/hide';
import elementContains from './bom/element_contains';
import formToObject from './bom/form_to_object';
import getStyle from './bom/get_style';
import setStyle from './bom/set_style';
import attr from './bom/attr';

// other
import uuid from './other/uuid';
import hash from './other/hash';
import judge from './other/judge';
import getType from './other/get_type';
import isTypeof from './other/is_typeof';
import construct from './other/construct';
import paramsName from './other/params_name';

// load
import loadImages from './load/load_images';
import loadjs from './load/loadjs';
import loadcss from './load/loadcss';

// json
import toJson from './json/to_json';

// cookie
import cookie from './cookie/cookie';
import setCookie from './cookie/set_cookie';
import getCookie from './cookie/get_cookie';
import deleteCookie from './cookie/delete_cookie';
import parseCookie from './cookie/parse_cookie';

// storage
import storage from './storage/storage';

// http
import getUrlParam from './http/get_url_param';
import setUrlParam from './http/set_url_param';
import deleteUrlParam from './http/delete_url_param';
import objectParam from './http/object_param';
import httpGet from './http/http_get';
import httpPost from './http/http_post';

// times
import setTimesout from './times/set_timesout';
import clearTimesout from './times/clear_timesout';
import getDate from './times/get_date';
import formatPassTime from './times/format_pass_time';
import formatRemainTime from './times/format_remain_time';
import formatDuration from './times/format_duration';

// fill
import fill0 from './fill/fill0';
import floor from './fill/floor';
import chainAsync from './fill/chain_async';
import numberFormat from './fill/number_format';

// random
import randomColor from './random/random_color';
import randomA2B from './random/random_a2b';
import randomKey from './random/random_key';

// behavior
import lockTouch from './behavior/lock_touch';
import copyToClipboard from './behavior/copy_to_clipboard';

// image
import checkImageSize from './image/check_image_size';
import imageOptimization from './image/image_optimization';

// lodash
import getTag from './lodash/get_tag';
import hasOwnProperty from './lodash/has_own_property';
import isObject from './lodash/is_object';
import isArray from './lodash/is_array';
import isString from './lodash/is_string';
import isBoolean from './lodash/is_boolean';
import isNumber from './lodash/is_number';
import isMap from './lodash/is_map';
import isSet from './lodash/is_set';
import isFunction from './lodash/is_function';
import isEmpty from './lodash/is_empty';
import isShallowEqual from './lodash/is_shallow_equal';
import has from './lodash/has';
import toPath from './lodash/to_path';
import reduce from './lodash/reduce';
import forEach from './lodash/for_each';
import map from './lodash/map';
import find from './lodash/find';
import findIndex from './lodash/find_index';
import get from './lodash/get';
import debounce from './lodash/debounce';
import throttle from './lodash/throttle';
import pick from './lodash/pick';
import omit from './lodash/omit';

// string
import string from './string/string';

// array
import array from './array/array';

export default {
  // version
  version,
  noConflict,
  // device
  ua,
  isIos,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  mqqbrowser,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  // log
  log,
  logs,
  removeConsole,
  // arg(arguments)
  args,
  trash,
  noop,
  merge,
  over,
  call,
  // bom
  open,
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  query,
  show,
  hide,
  elementContains,
  formToObject,
  getStyle,
  setStyle,
  attr,
  // other
  uuid,
  hash,
  judge,
  judgment: judge,
  getType,
  isTypeof,
  construct,
  paramsName,
  // load
  loadImages,
  loadjs,
  loadcss,
  // json
  toJson,
  toJSON: toJson,
  tojson: toJson,
  // cookie
  cookie,
  setCookie,
  getCookie,
  deleteCookie,
  delCookie: deleteCookie,
  parseCookie,
  // storage
  storage,
  // http
  getUrlParam,
  setUrlParam,
  deleteUrlParam,
  delUrlParam: deleteUrlParam,
  objectParam,
  httpGet,
  httpPost,
  // times
  setTimesout,
  clearTimesout,
  getDate,
  formatPassTime,
  formatRemainTime,
  formatDuration,
  // fill
  fill0,
  floor,
  chainAsync,
  numberFormat,
  // random
  randomColor,
  randomA2B,
  randomFromA2B: randomA2B,
  randomKey,
  // behavior
  lockTouch,
  copyToClipboard,
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
  omit,
  // string
  string,
  // array
  array
};
