import bbo from '../bbo';
describe('containsWith', function() {
  it('should pass example 1', function(done) {
    let expected = true;
    let result = bbo.containsWith('Kevin', 'K');
    expect(result).toEqual(expected);
    done();
  });
});
