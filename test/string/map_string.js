import bbo from '../bbo';

describe('mapString', function() {
  it('should pass base example 1', function(done) {
    expect(
      bbo.mapString('a b c d', (c, i, str) => {
        return c + i;
      })
    ).toEqual('a0 1b2 3c4 5d6');

    expect(bbo.mapString('Using our timing function', (c) => c.toUpperCase())).toEqual(
      'USING OUR TIMING FUNCTION'
    );
    done();
  });
});
