/************************************************************************
 * localStorage && sessionStorage
 * Method for safely supporting localStorage sessionStorage 'setItem' 'getItem' 'removeItem' 'removeAll',
 * Some extension method 'has' 'get' adn Store prefix
 *************************************************************************/
import { string } from '../string/string';

const ulocalStorage = window.localStorage;
const ussesionStorage = window.sessionStorage;
class Storage {
  constructor(options) {
    const {
      type = 'local',
      prefix = 'bbo.storage',
      message = {
        setItem: 'write in',
        getItem: 'read',
        removeAll: 'remove all',
        removeItem: 'remove item'
      }
    } = options;
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
        this.doItem(
          () => this._storage.setItem(`${this.prefix}.${k}`, JSON.stringify(key[k])),
          'setItem'
        );
      });
    } else {
      this.doItem(
        () => this._storage.setItem(`${this.prefix}.${key}`, JSON.stringify(value)),
        'setItem'
      );
    }
  }

  has(...keys) {
    return keys.every((key, index) => this._storage.getItem(`${this.prefix}.${key}`));
  }

  get(...keys) {
    const result = {};
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
    Object.keys(this._storage).forEach((k) => {
      if (string.contains(k, this.prefix)) {
        this._remove(`${k}`);
      }
    });
  }

  removeItem(...keys) {
    console.log(keys);
    keys.forEach((key, index) =>
      this.doItem(() => this._storage.removeItem(`${this.prefix}.${key}`), 'removeItem')
    );
  }

  _warn(action) {
    const { message } = this;
    console.warn(`Unable to ${message[action] || ''} ${this.type} Storage`);
  }

  _remove(keys) {
    this.doItem(() => this._storage.removeItem(`${keys}`), 'removeItem');
  }
}

const storage = ({ type, prefix }) =>
  new Storage({
    type,
    prefix
  });

export default storage;
