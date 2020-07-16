import bbo from '../bbo';

describe('noop', () => {
  test('bbo.noop is a Function', () => {
    expect(bbo.noop).toBeInstanceOf(Function);
  });
});
