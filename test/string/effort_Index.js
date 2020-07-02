import bbo from '../bbo';

describe('effortIndex', function() {
  it('should pass example 1', function(done) {
    let expected = 0;
    let result = bbo.effortIndex('Kevin', 'K');
    expect(result).toEqual(expected);
    done();
  });
  it('should pass example 2', function(done) {
    let expected = -1;
    let result = bbo.effortIndex('Kevin', 'Z');
    expect(result).toEqual(expected);
    done();
  });
});
