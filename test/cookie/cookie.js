import bbo from '../bbo';

describe('bbo.cookie()', () => {
  const cookie = 'c=v; c1=v';
  const cookieName = 'name={%22foo%22:%22bar%22}';

  test('bbo.cookie() is a Function', () => {
    expect(bbo.cookie()).toBeInstanceOf(Function);
    expect(bbo.cookie().set).toBeInstanceOf(Function);
    expect(bbo.cookie().get).toBeInstanceOf(Function);
    expect(bbo.cookie().getJSON).toBeInstanceOf(Function);
    expect(bbo.cookie().getJson).toBeInstanceOf(Function);
  });

  test('cookie().set()', function() {
    bbo.cookie().set('c', 'v');
    expect(document.cookie).toBe('c=v');
    bbo.cookie().set('c1', 'v');
    expect(document.cookie).toBe(cookie);
  });

  test('cookie().set() a object', function() {
    bbo.cookie().set('name', { foo: 'bar' });
    expect(document.cookie).toBe(`${cookie}; ${cookieName}`);
  });

  test('document nil', function() {
    window.document = undefined;
    bbo.cookie().set('c', 'v1');
    expect(document.cookie).toBe(`c=v1; c1=v; ${cookieName}`);
  });

  test('cookie().get()', function() {
    const c = bbo.cookie().get('c');
    expect(c).toBe('v1');
  });

  test('cookie().get()', function() {
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
    const c = bbo.cookie().get('c');
    const get = bbo.cookie().get();
    const getJson = bbo.cookie().getJSON();

    expect(c).toBe('v1');
    expect(get).toEqual(object);
    expect(getJson).toEqual(objectJson);
  });
});
