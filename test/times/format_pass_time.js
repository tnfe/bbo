import bbo from '../bbo';

describe('formatPassTime', function() {
  test('formatPassTime is a Function', () => {
    expect(bbo.formatPassTime).toBeInstanceOf(Function);
  });
});
