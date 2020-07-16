import bbo from '../bbo';

describe('args', () => {
  test('bbo.args is a Function', () => {
    expect(bbo.args).toBeInstanceOf(Function);
  });

  test('bbo.args works for slice', () => {
    function foo(a, b, c, d) {
      return bbo.args(arguments);
    }

    expect(foo(1, 2, 3)).toEqual([1, 2, 3]);
    expect(foo(1, 2, 3, 4, 5)).toEqual([1, 2, 3, 4, 5]);
  });

  test('bbo.args(arguments, first?) first defalult is 0', () => {
    function boo(a, b, c, d) {
      return bbo.args(arguments, 1);
    }
    expect(boo(1, 2, 3, 4)).toEqual([2, 3, 4]);
  });
});
