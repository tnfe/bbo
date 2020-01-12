import './internal/_rollupPluginBabelHelpers.js';
import { string } from './index2.js';

/************************************************************************
 * localStorage && sessionStorage
 * Method for safely supporting localStorage sessionStorage 'setItem' 'getItem' 'removeItem' 'removeAll',
 * Some extension method 'has' 'get' adn Store prefix
 *************************************************************************/
var ulocalStorage = window.localStorage;
var ussesionStorage = window.sessionStorage;

class Storage {
  constructor(options) {
    var _options$type = options.type,
        type = _options$type === void 0 ? 'local' : _options$type,
        _options$prefix = options.prefix,
        prefix = _options$prefix === void 0 ? 'bbo.storage' : _options$prefix,
        _options$message = options.message,
        message = _options$message === void 0 ? {
      setItem: 'write in',
      getItem: 'read',
      removeAll: 'remove all',
      removeItem: 'remove item'
    } : _options$message;
    this.prefix = prefix;
    this.type = type;
    this.message = message;

    if (type === 'local') {
      this._storage = ulocalStorage;
    } else if (type === 'session') {
      this._storage = ussesionStorage;
    }
  }

  doItem(func, action) {
    try {
      if (typeof func === 'function') {
        return func();
      }
    } catch (err) {
      this._warn(action);

      return null;
    }

    return true;
  }

  setItem(key, value) {
    if (typeof key === 'object') {
      Object.keys(key).forEach((k, index) => {
        this.doItem(() => this._storage.setItem(`${this.prefix}.${k}`, JSON.stringify(key[k])), 'setItem');
      });
    } else {
      this.doItem(() => this._storage.setItem(`${this.prefix}.${key}`, JSON.stringify(value)), 'setItem');
    }
  }

  has() {
    for (var _len = arguments.length, keys = new Array(_len), _key = 0; _key < _len; _key++) {
      keys[_key] = arguments[_key];
    }

    return keys.every((key, index) => this._storage.getItem(`${this.prefix}.${key}`));
  }

  get() {
    var result = {};

    for (var _len2 = arguments.length, keys = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      keys[_key2] = arguments[_key2];
    }

    keys.forEach((key, index) => {
      if (`${this._storage.getItem(`${this.prefix}.${key}`)}` !== 'null') {
        try {
          result[key] = JSON.parse(this._storage.getItem(`${this.prefix}.${key}`));
        } catch (err) {
          console.warn(this._warn('getItem'));
        }
      }
    });
    return result;
  }

  getItem(key) {
    return this.doItem(() => JSON.parse(this._storage.getItem(`${this.prefix}.${key}`)), 'getItem');
  }

  removeAll() {
    Object.keys(this._storage).forEach(k => {
      if (string.contains(k, this.prefix)) {
        this._remove(`${k}`);
      }
    });
  }

  removeItem() {
    for (var _len3 = arguments.length, keys = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      keys[_key3] = arguments[_key3];
    }

    console.log(keys);
    keys.forEach((key, index) => this.doItem(() => this._storage.removeItem(`${this.prefix}.${key}`), 'removeItem'));
  }

  _warn(action) {
    var message = this.message;
    console.warn(`Unable to ${message[action] || ''} ${this.type} Storage`);
  }

  _remove(keys) {
    this.doItem(() => this._storage.removeItem(`${keys}`), 'removeItem');
  }

}

var storage = (_ref) => {
  var type = _ref.type,
      prefix = _ref.prefix;
  return new Storage({
    type: type,
    prefix: prefix
  });
};

export default storage;
