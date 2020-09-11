import bbo from '../bbo';

describe('uuid', () => {
  test('bbo.judge() is a Function', () => {
    expect(bbo.judge).toBeInstanceOf(Function);
  });

  test('bbo.judge()', () => {
    const array = ['2', 'js', 'jsx', '.js', '.jsx', '.css', '.less'];
    const object = {};
    const loose = bbo.judge(2, array);
    const strict = bbo.judge(2, array, true);
    const error = bbo.judge(2, object);

    expect(loose).toBe(true);
    expect(strict).toBe(false);
    expect(error).toBe(false);
  });
});
