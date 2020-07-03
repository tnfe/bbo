import bbo from '../bbo';

describe('mask', function() {
  it('should pass base number example 1', function(done) {
    expect(bbo.mask(1234567890)).toEqual('******7890');
    expect(bbo.mask(1234567890, 3)).toEqual('*******890');
    expect(bbo.mask(1234567890, -4, '$')).toEqual('$$$$567890');
    done();
  });

  it('should pass base string example 1', function(done) {
    expect(bbo.mask('adcdefghijk')).toEqual('*******hijk');
    expect(bbo.mask('adcdefghijk', 3)).toEqual('********ijk');
    expect(bbo.mask('adcdefghijk', -4, '$')).toEqual('$$$$efghijk');
    done();
  });
});
