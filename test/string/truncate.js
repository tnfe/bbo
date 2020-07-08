import bbo from '../bbo';

describe('truncate', function() {
  it('should pass base example 1', function(done) {
    expect(bbo.truncate('abcdefg')).toEqual('abc...');
    expect(bbo.truncate('abcdefg', 1)).toEqual('a...');
    expect(bbo.truncate('abcdefg', 3)).toEqual('abc...');
    expect(bbo.truncate('abcdefg', 4)).toEqual('a...');
    expect(bbo.truncate('boomerang', 7)).toEqual('boom...');
    expect(bbo.truncate('abcdefgabcdefg', 7)).toEqual('abcd...');
    expect(bbo.truncate('abcdefgabcdefg', 10)).toEqual('abcdefg...');
    done();
  });
});
