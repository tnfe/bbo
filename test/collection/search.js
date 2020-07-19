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

  it('should pass example 3', () => {
    let expected = 'a';
    let result = bbo.search('3', { a: 3, b: 5, c: 7 });
    expect(result).toEqual(expected);
    expect(bbo.search('3', { a: 3, b: 5, c: 7 }, 0)).toEqual(expected);
  });

  it('should pass example 3', () => {
    expect(bbo.search({})).toEqual(false);
    expect(bbo.search([])).toEqual(false);
    expect(bbo.search(null)).toEqual(false);
    expect(bbo.search('1')).toEqual(false);
    expect(bbo.search(() => {})).toEqual(false);
    expect(bbo.search({}, {}, {})).toEqual(false);
  });
});
