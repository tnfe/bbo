import bbo from '../bbo';

describe('underscored', function() {
  test('Turn CamelCase to _ ', function() {
    expect(bbo.underscored('toUpperCase')).toStrictEqual('to_upper_case');
  });
});
