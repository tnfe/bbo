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
import isQQbrowser from './device/is_qq_browser';
import isTenvideo from './device/is_tenvideo';
import isWeiShi from './device/is_weishi';
import isIphoneXmodel from './device/is_iphonex_model';
import isIE from './device/is_ie';
import ieVersion from './device/ie_version';

// args
import args from './args/args';
import noop from './args/noop';
import merge from './args/merge';
import over from './args/over';
import call from './args/call';
import hasOwnProperty from './args/has_own_property';

// bom
import open from './bom/open';
import stopPropagation from './bom/stop_propagation';
import g from './bom/g';
import gc from './bom/gc';
import c from './bom/c';
import query from './bom/query';
import show from './bom/show';
import hide from './bom/hide';
import elementContains from './bom/element_contains';
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
import log from './other/log';

// object
import properObject from './object/proper_object';
import objectDiff from './object/object_diff';
import addedDiff from './object/added_diff';
import deletedDiff from './object/deleted_diff';
import updatedDiff from './object/updated_diff';
import detailedDiff from './object/detailed_diff';

// json
import toJson from './json/to_json';
import jsonp from './json/jsonp';

// cookie
import cookie from './cookie/cookie';
import setCookie from './cookie/set_cookie';
import getCookie from './cookie/get_cookie';
import deleteCookie from './cookie/delete_cookie';
import parseCookie from './cookie/parse_cookie';

// http
import getUrlParam from './http/get_url_param';
import setUrlParam from './http/set_url_param';
import deleteUrlParam from './http/delete_url_param';
import objectParam from './http/object_param';
import httpGet from './http/http_get';
import httpPost from './http/http_post';
import isAbsoluteURL from './http/is_absolute_url';

// times
import setTimesout from './times/set_timesout';
import clearTimesout from './times/clear_timesout';
import getDate from './times/get_date';
import formatPassTime from './times/format_pass_time';
import formatRemainTime from './times/format_remain_time';
import formatDuration from './times/format_duration';
import sleep from './times/sleep';
import retry from './times/retry';

// fill
import fill0 from './fill/fill0';
import floor from './fill/floor';
import chainAsync from './fill/chain_async';
import numberFormat from './fill/number_format';
import modulo from './fill/modulo';

// random
import randomColor from './random/random_color';
import randomA2B from './random/random_a2b';
import randomKey from './random/random_key';

// behavior
import lockTouch from './behavior/lock_touch';
import copyToClipboard from './behavior/copy_to_clipboard';
import trigger from './behavior/trigger';

// collection
import clone from './collection/clone';
import values from './collection/values';
import entries from './collection/entries';
import extend from './collection/extend';
import flush from './collection/flush';
import size from './collection/size';
import search from './collection/search';

// lodash
import getTag from './lodash/get_tag';
import is from './lodash/is';
import isObject from './lodash/is_object';
import isDate from './lodash/is_date';
import isArray from './lodash/is_array';
import isString from './lodash/is_string';
import isBoolean from './lodash/is_boolean';
import isNumber from './lodash/is_number';
import isMap from './lodash/is_map';
import isSet from './lodash/is_set';
import isSymbol from './lodash/is_symbol';
import isFunction from './lodash/is_function';
import isEmpty from './lodash/is_empty';
import isNil from './lodash/is_nil';
import isShallowEqual from './lodash/is_shallow_equal';
import has from './lodash/has';
import toPath from './lodash/to_path';
import reduce from './lodash/reduce';
import forEach from './lodash/for_each';
import map from './lodash/map';
import mapValues from './lodash/map_values';
import find from './lodash/find';
import findIndex from './lodash/find_index';
import get from './lodash/get';
import set from './lodash/set';
import debounce from './lodash/debounce';
import throttle from './lodash/throttle';
import pick from './lodash/pick';
import omit from './lodash/omit';

// string
import trim from './string/trim';
import fillZero from './string/fill_zero';
import longUnique from './string/long_unique';
import stripTags from './string/strip_tags';
import capitalize from './string/capitalize';
import deCapitalize from './string/de_capitalize';
import mapString from './string/map_string';
import mask from './string/mask';
import splitLines from './string/split_lines';
import camelize from './string/camelize';
import underscored from './string/underscored';
import dasherize from './string/dasherize';
import truncate from './string/truncate';
import byteSize from './string/byte_size';
import byteLen from './string/byte_len';
import repeat from './string/repeat';
import endsWith from './string/ends_with';
import startsWith from './string/starts_with';
import containsWith from './string/contains_with';
import xssFilter from './string/xss_filter';
import effortIndex from './string/effort_Index';
import capwords from './string/capwords';

// array
import unique from './array/unique';
import uniqueBy from './array/unique_by';
import uniqueFrom from './array/unique_from';
import random from './array/random';
import randomSize from './array/random_size';
import shuffle from './array/shuffle';
import contains from './array/contains';
import copyArray from './array/copy_array';
import includesAll from './array/includes_all';
import includesAny from './array/includes_any';
import removeAt from './array/remove_at';
import remove from './array/remove';
import compact from './array/compact';
import pluck from './array/pluck';
import union from './array/union';
import unionBy from './array/union_by';
import unionWith from './array/union_with';
import intersect from './array/intersect';
import intersectBy from './array/intersect_by';
import difference from './array/difference';
import differenceBy from './array/difference_by';
import max from './array/max';
import min from './array/min';
import equal from './array/equal';
import allEqual from './array/all_equal';
import all from './array/all';
import any from './array/any';
import chunk from './array/chunk';
import countBy from './array/count_by';
import countOccurrences from './array/count_occurrences';
import drop from './array/drop';
import dropRight from './array/drop_right';
import dropWhile from './array/drop_while';
import dropRightWhile from './array/drop_right_while';
import column from './array/column';
import split from './array/split';
import unary from './array/unary';
import indexBy from './array/index_by';

export default {
  // version
  version,
  noConflict,
  // device
  ua,
  isIos,
  isIOS: isIos,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isQQbrowser,
  isTenvideo,
  isWeiShi,
  isIphoneXmodel,
  ieVersion,
  isIE,
  // arg(arguments)
  args,
  noop,
  merge,
  over,
  call,
  hasOwnProperty,
  // bom
  trigger,
  stopPropagation,
  g,
  gc,
  c,
  query,
  show,
  hide,
  elementContains,
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
  log,
  // object
  properObject,
  objectDiff,
  addedDiff,
  deletedDiff,
  updatedDiff,
  detailedDiff,
  // json
  toJson,
  toJSON: toJson,
  tojson: toJson,
  jsonp,
  // cookie
  cookie,
  setCookie,
  getCookie,
  deleteCookie,
  delCookie: deleteCookie,
  parseCookie,
  // http
  open,
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
  sleep,
  retry,
  // fill
  fill0,
  floor,
  chainAsync,
  numberFormat,
  modulo,
  // random
  randomColor,
  randomA2B,
  randomFromA2B: randomA2B,
  randomKey,
  // behavior
  lockTouch,
  copyToClipboard,
  // collection
  clone,
  deepClone: clone,
  values,
  entries,
  extend,
  flush,
  search,
  size,
  // lodash
  getTag,
  is,
  isObject,
  isDate,
  isArray,
  isString,
  isBoolean,
  isNumber,
  isMap,
  isSet,
  isSymbol,
  isFunction,
  isEmpty,
  isNil,
  isShallowEqual,
  isEqual: isShallowEqual,
  has,
  reduce,
  forEach,
  each: forEach,
  map,
  mapValues,
  findIndex,
  find,
  toPath,
  get,
  set,
  debounce,
  throttle,
  pick,
  omit,
  // string
  trim,
  fillZero,
  longUnique,
  stripTags,
  capitalize,
  deCapitalize,
  isAbsoluteURL,
  mapString,
  mask,
  splitLines,
  camelize,
  underscored,
  dasherize,
  truncate,
  byteSize,
  byteLen,
  repeat,
  endsWith,
  startsWith,
  containsWith,
  xssFilter,
  effortIndex,
  capwords,
  // array
  unique,
  uniqueBy,
  uniqueFrom,
  random,
  randomSize,
  shuffle,
  contains,
  copyArray,
  includesAll,
  includesAny,
  removeAt,
  remove,
  compact,
  pluck,
  union,
  unionBy,
  unionWith,
  intersect,
  intersectBy,
  difference,
  differenceBy,
  max,
  min,
  equal,
  allEqual,
  all,
  any,
  chunk,
  countBy,
  countOccurrences,
  drop,
  dropRight,
  dropWhile,
  dropRightWhile,
  column,
  split,
  unary,
  indexBy
};
