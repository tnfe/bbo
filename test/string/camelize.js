import bbo from '../bbo';

describe('camelize', function() {
  test('_ or - to camelCase', function() {
    expect(bbo.camelize('to-upper-case')).toStrictEqual('toUpperCase');
  });
  test('base case', function() {
    expect(bbo.camelize('toUpperCase')).toStrictEqual('toUpperCase');
  });
});
