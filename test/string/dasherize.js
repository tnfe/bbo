import bbo from '../bbo';
describe('dasherize', function() {
  it('should pass example 1', function(done) {
    let expected = 'hello-world';
    let result = bbo.dasherize('hello_world');
    expect(result).toEqual(expected);
    done();
  });
});
