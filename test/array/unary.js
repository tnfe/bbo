import bbo from '../bbo';

describe('unary', () => {
  test('unary is a Function', () => {
    expect(bbo.unary).toBeInstanceOf(Function);
  });
  test('Discards arguments after the first one', () => {
    expect(['6', '8', '10'].map(bbo.unary(parseInt))).toEqual([6, 8, 10]);
  });
});
