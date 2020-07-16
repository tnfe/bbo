import bbo from '../bbo';

describe('call', () => {
  test('bbo.call is a Function', () => {
    expect(bbo.call).toBeInstanceOf(Function);
  });

  test('calls function on given object', () => {
    expect(bbo.call('map', (x) => x * 2)([1, 2, 3])).toEqual([2, 4, 6]);
  });
});
