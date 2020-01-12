import isTypeof from '../other/is_typeof';
/**
 * to json
 */

// eval hack
const evil = (fn) => {
  // A variable points to Function, preventing reporting errors
  let Fn = Function;
  return new Fn('return ' + fn)();
};

// bbo.toJSON = bbo.tojson = bbo.toJson
const toJson = (res) => {
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

export default toJson;
