import bbo from '../bbo';

describe('search', () => {
  it('should pass example 1', () => {
    let expected = 'surname';
    let result = bbo.search('zonneveld', {
      firstname: 'kevin',
      middle: 'van',
      surname: 'zonneveld'
    });
    expect(result).toEqual(expected);
  });

  it('should pass example 2', () => {
    let expected = 'a';
    let result = bbo.search('3', { a: 3, b: 5, c: 7 });
    expect(result).toEqual(expected);
  });
});
