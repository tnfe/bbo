import { isTypeof } from './index9.js';

/**
 * to json
 */
// eval hack

var evil = fn => {
  // A variable points to Function, preventing reporting errors
  var Fn = Function;
  return new Fn('return ' + fn)();
}; // bbo.toJSON = bbo.tojson = bbo.toJson


var toJson = res => {
  if (!res) return null;

  if (typeof res === 'string') {
    try {
      return JSON.parse(res);
    } catch (e) {
      return evil('(' + res + ')');
    }
  } else if (isTypeof(res.json, 'function')) {
    return res.json();
  } else {
    return res;
  }
};

export { toJson };
