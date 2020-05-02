import { REGEXP_SEMVER } from '../const';
import bbo from '../bbo';

describe('version', function() {
  it('should match semantic version number pattern', function() {
    expect(REGEXP_SEMVER.test(bbo.version)).toBe(true);
  });
});
