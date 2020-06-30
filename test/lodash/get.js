// import assert from 'assert';
import bbo from '../bbo';

describe('get', function() {
  test('returns existing properties using dot-notation arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: 0 };
    expect(bbo.get(obj, 'a')).toStrictEqual({ aa: { aaa: 2 } });
    expect(bbo.get(obj, 'a.aa')).toStrictEqual({ aaa: 2 });
    expect(bbo.get(obj, 'a.aa.aaa')).toStrictEqual(2);
    expect(bbo.get(obj, 'b')).toStrictEqual(0);
    expect(bbo.get(obj.a, 'aa')).toStrictEqual({ aaa: 2 });
    expect(bbo.get(obj.a.aa, 'aaa')).toStrictEqual(2);
  });

  test('returns existing properties using array arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: null };
    expect(bbo.get(obj, ['a'])).toStrictEqual({ aa: { aaa: 2 } });
    expect(bbo.get(obj, ['a', 'aa'])).toStrictEqual({ aaa: 2 });
    expect(bbo.get(obj, ['a', 'aa', 'aaa'])).toStrictEqual(2);
    expect(bbo.get(obj, ['b'])).toStrictEqual(null);
    expect(bbo.get(obj.a, ['aa'])).toStrictEqual({ aaa: 2 });
    expect(bbo.get(obj.a.aa, ['aaa'])).toStrictEqual(2);

    let arr = ['a', 'aa', 'aaa'];
    expect(bbo.get(obj, arr)).toStrictEqual(2);
    expect(bbo.get(arr, ['a', 'aa', 'aaa'])); // array arg preserved
  });

  test('returns undefined for non-existing properties, using dot-notation arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(bbo.get(obj, 'b.bb')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'a.bb')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'b.bb.bbb')).toStrictEqual(undefined);
    expect(bbo.get(obj.b, 'bb.bbb')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'c.cc')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'd.dd.ddd')).toStrictEqual(undefined);
  });

  test('returns 3rd param for non-existing properties, using dot-notation arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(bbo.get(obj, 'b.bb', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'a.bb', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'b.bb.bbb', 888)).toStrictEqual(888);
    expect(bbo.get(obj.b, 'bb.bbb', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'c.cc', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'd.dd.ddd', 888)).toStrictEqual(888);
  });

  test('returns undefined for non-existing properties, using array arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(bbo.get(obj, ['b', 'bb'])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['a', 'bb'])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['b', 'bb', 'bbb'])).toStrictEqual(undefined);
    expect(bbo.get(obj.b, ['bb', 'bbb'])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['c', 'cc'])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['d', 'dd', 'ddd'])).toStrictEqual(undefined);

    let arr = ['b', 'bb', 'bbb'];
    expect(bbo.get(obj, arr)).toStrictEqual(undefined);
    expect(bbo.get(arr, ['b', 'bb', 'bbb'])); // array arg preserved
  });

  test('returns 3rd param for non-existing properties, using array arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: 4, c: null, d: 0 };
    expect(bbo.get(obj, ['b', 'bb'], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['a', 'bb'], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['b', 'bb', 'bbb'], 888)).toStrictEqual(888);
    expect(bbo.get(obj.b, ['bb', 'bbb'], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['c', 'cc'], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['d', 'dd', 'ddd'], 888)).toStrictEqual(888);

    let arr = ['b', 'bb', 'bbb'];
    expect(bbo.get(obj, arr, 888)).toStrictEqual(888);
    expect(bbo.get(arr, ['b', 'bb', 'bbb'])); // array arg preserved
  });

  test('returns undefined for falsey property names using dot notation', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: {} };
    expect(bbo.get(obj, 'a.')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'a.aa.aaa.')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'b.')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'b..b')).toStrictEqual(undefined);
    expect(bbo.get(obj, 'b...b')).toStrictEqual(undefined);
  });
  test('returns 3rd param for falsey property names using dot notation', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: {} };
    expect(bbo.get(obj, 'a.', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'a.aa.aaa.', 888)).toStrictEqual(888);
    expect(bbo.get(obj, 'b.', 888)).toStrictEqual(888);
  });

  test('returns undefined for falsey property names using array arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: { '': { '': 3 } } };
    expect(bbo.get(obj, ['a', false])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['a', 'aa', 'aaa', null])).toStrictEqual(undefined);
    expect(bbo.get(obj, ['b', undefined])).toStrictEqual(undefined);

    let arr = ['a', 'aa', 'aaa', null];
    expect(bbo.get(obj, arr)).toStrictEqual(undefined);
    expect(bbo.get(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  });

  test('returns 3rd param for falsey property names using array arg', () => {
    let obj = { a: { aa: { aaa: 2 } }, b: { '': { '': 3 } } };
    expect(bbo.get(obj, ['a', false], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['a', 'aa', 'aaa', null], 888)).toStrictEqual(888);
    expect(bbo.get(obj, ['b', undefined], 888)).toStrictEqual(888);
    let arr = ['a', 'aa', 'aaa', null];
    expect(bbo.get(obj, arr, 888)).toStrictEqual(888);
    expect(bbo.get(arr, ['a', 'aa', 'aaa', null])); // array arg preserved
  });

  test('follows empty keys using array arg', () => {
    let obj = { b: { '': { '': 3 } } };
    expect(bbo.get(obj, ['b', ''])).toStrictEqual({ '': 3 });
    expect(bbo.get(obj, ['b', '', ''])).toStrictEqual(3);
  });

  test('returns undefined if first argument is a falsey value', () => {
    expect(bbo.get(null, 'a')).toStrictEqual(undefined);
    expect(bbo.get(undefined, 'a')).toStrictEqual(undefined);
  });

  test('returns 3rd argument if first argument is a falsey value', () => {
    expect(bbo.get(null, 'a', 888)).toStrictEqual(888);
    expect(bbo.get(undefined, 'a', 888)).toStrictEqual(888);
  });

  /* eslint-disable no-undef */
  if (typeof Symbol === 'function') {
    test('works with symbols', () => {
      let obj = { a: {} };
      // eslint-disable-next-line symbol-description
      let sym = Symbol();
      obj.a[sym] = 4;
      expect(bbo.get(obj.a, sym)).toStrictEqual(4);
    });
  }
});
