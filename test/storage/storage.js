import bbo from '../bbo';

const local = window.localStorage;
const session = window.sessionStorage;
describe('storage', () => {
  test('bbo.storage() is a Function', () => {
    expect(bbo.storage).toBeInstanceOf(Function);
  });

  test('bbo.storage().setItem() key or string &has()', () => {
    let type = 'local';
    let prefix = 'debug';
    let name = 'view';
    let value = { a: 1, b: 2 };
    let key = { d: 3, e: 4 };

    bbo.storage({ type, prefix }).setItem(name, value);
    let getItem = local.getItem(`${prefix}.${name}`);
    expect(JSON.parse(getItem)).toEqual(value);
    let has = bbo.storage({ type, prefix }).has(name);
    expect(has).toBe(true);

    bbo.storage({ type, prefix }).setItem(key);
    bbo.forEach(key, (v, item) => {
      let keyItem = local.getItem(`${prefix}.${item}`);
      expect(JSON.parse(keyItem)).toEqual(v);
      has = bbo.storage({ type, prefix }).has(item);
      expect(has).toBe(true);
    });

    type = 'session';
    bbo.storage({ type, prefix }).setItem(name, value);
    getItem = session.getItem(`${prefix}.${name}`);
    expect(JSON.parse(getItem)).toEqual(value);
    has = bbo.storage({ type, prefix }).has(name);
    expect(has).toBe(true);

    bbo.storage({ type, prefix }).setItem(key);
    bbo.forEach(key, (v, item) => {
      let keyItem = local.getItem(`${prefix}.${item}`);
      expect(JSON.parse(keyItem)).toEqual(v);
      has = bbo.storage({ type, prefix }).has(item);
      expect(has).toBe(true);
    });
  });

  test('bbo.storage().get()', () => {
    let type = 'local';
    let prefix = 'debug';
    let name = 'view';
    let value = { a: 1, b: 2 };

    let get = bbo.storage({ type, prefix }).get(name);
    expect(get).toEqual({
      view: value
    });
  });

  test('bbo.storage().removeItem()', () => {
    let type = 'local'; // or session
    let prefix = 'debug';
    let name = 'view';

    bbo.storage({ type, prefix }).removeItem(name);
    let has = bbo.storage({ type, prefix }).has(name);
    expect(has).toBe(false);
  });

  test('bbo.storage().removeAll()', () => {
    let type = 'local'; // or session
    let prefix = 'debug';
    let name = 'view';

    bbo.storage({ type, prefix }).removeAll();
    let has = bbo.storage({ type, prefix }).has(name);
    expect(has).toBe(false);
  });
});
