import bbo from '../bbo';

describe('unionBy', () => {
  test('unionBy is a Function', () => {
    expect(bbo.unionBy).toBeInstanceOf(Function);
  });

  test('Produces the appropriate results', () => {
    expect(bbo.unionBy([2.1], [1.2, 2.3], Math.floor)).toEqual([2.1, 1.2]);
  });
});
