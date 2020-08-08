import bbo from '../bbo';

describe('bbo.cookie()', () => {
  test('cookie().set()', function() {
    document.cookie = 'c=v';
    expect(bbo.getCookie('c')).toBe('v');
  });
});
