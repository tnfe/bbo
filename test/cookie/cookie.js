import bbo from '../bbo';

describe('bbo.cookie()', () => {
  const cookie = 'c=v; c1=v';
  const cookieName = 'name={%22foo%22:%22bar%22}';
  const object = {
    c: 'v1',
    c1: 'v',
    name: '{"foo":"bar"}'
  };
  const objectJson = {
    c: 'v1',
    c1: 'v',
    name: {
      foo: 'bar'
    }
  };

  test('bbo.cookie() is a Function', () => {
    expect(bbo.cookie()).toBeInstanceOf(Function);
    expect(bbo.cookie().set).toBeInstanceOf(Function);
    expect(bbo.cookie().get).toBeInstanceOf(Function);
    expect(bbo.cookie().getJSON).toBeInstanceOf(Function);
    expect(bbo.cookie().getJson).toBeInstanceOf(Function);
    expect(bbo.cookie().remove).toBeInstanceOf(Function);
  });

  test('bbo.cookie().set()', function() {
    bbo.cookie().set('c', 'v');
    expect(document.cookie).toBe('c=v');
    bbo.cookie().set('c1', 'v');
    expect(document.cookie).toBe(cookie);
  });

  test('bbo.cookie().set() a object', function() {
    bbo.cookie().set('name', { foo: 'bar' });
    expect(document.cookie).toBe(`${cookie}; ${cookieName}`);
  });

  test('document nil', function() {
    window.document = undefined;
    bbo.cookie().set('c', 'v1');
    expect(document.cookie).toBe(`c=v1; c1=v; ${cookieName}`);
  });

  test('bbo.cookie().get()', function() {
    const c = bbo.cookie().get('c');
    expect(c).toBe('v1');
  });

  test('bbo.cookie().get()', function() {
    const c = bbo.cookie().get('c');
    const get = bbo.cookie().get();
    const getJson = bbo.cookie().getJSON();
    const getkey = bbo.cookie().get('name');
    const getkeyJson = bbo.cookie().getJson('name');

    expect(c).toBe('v1');
    expect(get).toEqual(object);
    expect(getJson).toEqual(objectJson);
    expect(getkey).toEqual(object.name);
    expect(getkeyJson).toEqual(objectJson.name);
  });

  test('bbo.cookie().remove()', function() {
    bbo.cookie().remove('c');
    const c = bbo.cookie().get('c');
    expect(c).toBe(undefined);
  });

  test('bbo.cookie() add read', function() {
    const wirte = bbo.cookie().set('c1', 'v1');
    expect(wirte).toEqual('c1=v1; path=/');
    const read = bbo.cookie().set('c2', 'v2');
    expect(read).toEqual('c2=v2; path=/');
    const readNew = bbo.cookie().set('c2', 'v2');
    expect(readNew).toEqual('c2=v2; path=/');
  });

  test('bbo.cookie().set() more', function() {
    bbo.cookie().set('c3', 'v', { expires: 7, path: '/', domain: '.github.com', secure: true });
    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=v2`);
  });

  test('bbo.cookie() extend write decoder', function() {
    bbo
      .cookie()
      .withConverter({
        write: function(value) {
          let encoded = value.replace('a', 'A');
          return bbo.cookie().withConverter(encoded);
        }
      })
      .set('c', 'a;');
    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=v2`);
  });

  test('bbo.cookie() extend read decoder', function() {
    const readConverter = function(value) {
      return value.toUpperCase();
    };
    const api = bbo.cookie().withConverter({
      read: readConverter
    });

    bbo
      .cookie()
      .withConverter(api)
      .set('c2', 'a2;');

    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=a2%3B`);
  });

  test('cookie error', function() {
    document.cookie = 'c1';
    bbo.cookie().set('c', 'v2');

    expect(document.cookie).toBe(`c1=v1; ${cookieName}; c2=a2%3B; c1; c=v2`);
  });
});
