import bbo from '../bbo';

describe('longUnique', function() {
  it('should pass no number input', function(done) {
    expect(bbo.longUnique('abc')).toEqual('abc');
    expect(bbo.longUnique('12345')).toEqual('12345');
    expect(bbo.longUnique('1')).toEqual('1');
    expect(bbo.longUnique('')).toEqual('');
    done();
  });

  it('should pass base example 1', function(done) {
    expect(bbo.longUnique('strtring')).toEqual('string');
    expect(bbo.longUnique('sTrString')).toEqual('sTrSting');
    expect(bbo.longUnique('abcdefg abcdefgi hijk')).toEqual('abcdefg ihjk');
    expect(bbo.longUnique('123456 123 7')).toEqual('123456 7');
    done();
  });
});
