const ulocalStorage = window.localStorage;
const ussesionStorage = window.sessionStorage;
/**
 * How to check whether a Storage item is set?
 * 如何判断是否存在某个item?
 * https://stackoverflow.com/questions/3262605/how-to-check-whether-a-storage-item-is-set
 */
class Storage {
  constructor(options) {
    const {
      type,
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
  _warn(action) {
    const { message } = this;
    console.warn(`Unable to ${message[action] || ''} ${this.type} Storage`);
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
    this.doItem(() => this._storage.removeAll(), 'removeAll');
  }
  removeItem(...keys) {
    keys.forEach((key, index) =>
      this.doItem(() => this._storage.removeItem(`${this.prefix}${key}`), 'removeItem')
    );
  }
}
const storage = ({ type, prefix }) =>
  new Storage({
    type,
    prefix
  });

export { storage };
