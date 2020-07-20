import bbo from '../bbo';

describe('trim', function() {
  it('should pass base example 1', function(done) {
    expect(bbo.trim(' abc  ')).toEqual('abc');
    expect(bbo.trim(' abc')).toEqual('abc');
    expect(bbo.trim('abc')).toEqual('abc');
    expect(bbo.trim('a bc')).toEqual('a bc');
    expect(bbo.trim(' ')).toEqual('');
    expect(bbo.trim(null)).toEqual(null);
    done();
  });
});
