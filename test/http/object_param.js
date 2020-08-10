import bbo from '../bbo';

describe('objectParam', () => {
  const param = 'a=1&b=2&c=3&d=4';
  const array = [
    { name: 'a', value: '1' },
    { name: 'b', value: '2' },
    { name: 'c', value: '3' },
    { name: 'd', value: '4' }
  ];
  const object = {
    a: 1,
    b: 2,
    c: 3,
    d: [4]
  };

  test('bbo.objectParam() is a Function', () => {
    expect(bbo.objectParam).toBeInstanceOf(Function);
  });

  test('param is array', () => {
    expect(bbo.objectParam(array)).toBe(param);
  });
  test('param is object', () => {
    expect(bbo.objectParam(object)).toBe(param);
  });
});
