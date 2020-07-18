import bbo from '../bbo';

describe('clone', () => {
  test('copies entire tree', function() {
    var arr = [1, 2, 3];
    var subObj = { aa: 1 };
    var obj = { a: 3, b: 5, c: arr, d: subObj };
    var objClone = bbo.clone(obj);
    expect(objClone).toEqual(obj);

    var arr = [1, 2, ['a', 'b', { dd: [1, 2, 3] }]];
    var arrClone = bbo.clone(arr);
    expect(arrClone).toEqual(arr);
  });

  test('clones child plain objects and arrays', function() {
    const arr = [1, 2, 3];
    const subObj = { aa: 1 };
    const obj = { a: 3, b: 5, c: arr, d: subObj };
    const objClone = bbo.clone(obj);
    arr.push(4);
    subObj.bb = 2;
    expect(obj).toEqual({ a: 3, b: 5, c: [1, 2, 3, 4], d: { aa: 1, bb: 2 } });

    expect(objClone).toEqual({ a: 3, b: 5, c: [1, 2, 3], d: { aa: 1 } });
  });

  test('clones Functions, Dates and RegExps', function() {
    const date = new Date();
    const regexp = /a(b)c/gim;
    const obj = { b: date, c: regexp };
    const objClone = bbo.clone(obj);
    const objToString = Object.prototype.toString;

    expect(objToString.call(objClone.b)).toEqual('[object Date]');
    expect(objToString.call(objClone.c)).toEqual('[object RegExp]');

    objClone.b.setTime(date.getTime() + 87);
    expect(objClone.b.getTime() - date.getTime()).toEqual(87);
    objClone.c.compile(/a(c)/gi);

    expect(regexp.source).toEqual('a(b)c');
    expect(objClone.c.source).toEqual('a(c)');
    expect(regexp.flags).toEqual('gim');
    expect(objClone.c.flags).toEqual('gi');
  });
});
