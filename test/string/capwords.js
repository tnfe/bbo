import bbo from '../bbo';

describe('capwords', function() {
  test('should pass base example 1', function() {
    expect(bbo.capwords('kevin van  zonneveld')).toStrictEqual('Kevin Van  Zonneveld');
    expect(bbo.capwords('HELLO WORLD')).toStrictEqual('HELLO WORLD');
  });
});
