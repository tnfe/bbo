import bbo from '../bbo';

describe('fillZero', function() {
  it('should pass no number input', function(done) {
    expect(bbo.fillZero('abc')).toEqual('abc');
    expect(bbo.fillZero('12345')).toEqual('12345');
    expect(bbo.fillZero('1')).toEqual('1');
    expect(bbo.fillZero('')).toEqual('');
    done();
  });

  it('should pass base example 1', function(done) {
    expect(bbo.fillZero('12345', 10)).toEqual('0000012345');
    expect(bbo.fillZero('abcdefg', 10)).toEqual('000abcdefg');
    done();
  });

  it('should pass slice', function(done) {
    expect(bbo.fillZero('12345', 2)).toEqual('45');
    expect(bbo.fillZero('abc', 3)).toEqual('abc');
    expect(bbo.fillZero('abc', 1)).toEqual('c');
    done();
  });
});
