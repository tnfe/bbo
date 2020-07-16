import bbo from '../bbo';

describe('merge', () => {
  test('bbo.merge is a Function', () => {
    expect(bbo.merge).toBeInstanceOf(Function);
  });

  const object = {
    a: [{ x: 2 }, { y: 4 }],
    b: 1
  };
  const other = {
    a: { z: 3 },
    b: [2, 3],
    c: 'foo'
  };
  test('merge two objects', () => {
    expect(bbo.merge(object, other)).toEqual({
      a: [{ x: 2 }, { y: 4 }, { z: 3 }],
      b: [1, 2, 3],
      c: 'foo'
    });
  });
});
