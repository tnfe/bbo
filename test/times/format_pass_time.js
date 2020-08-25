import bbo from '../bbo';

describe('formatPassTime', function() {
  test('formatPassTime is a Function', () => {
    expect(bbo.formatPassTime).toBeInstanceOf(Function);
  });
  test('date aogo', () => {
    const aDay = 24 * 60 * 60 * 1000;
    expect(bbo.formatPassTime(new Date(Date.now() - aDay))).toBe('24 hours');
    expect(bbo.formatPassTime(new Date(Date.now() - aDay * 2))).toBe('2 days');
    expect(bbo.formatPassTime(new Date(Date.now() - aDay * 365 * 50))).toBe('50 years');
  });
});
