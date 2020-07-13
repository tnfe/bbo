import bbo from '../bbo';

describe('unique', () => {
  test('bbo.unique is a Function', () => {
    expect(bbo.unique).toBeInstanceOf(Function);
  });
  test('bbo.unique([1, 2, 2, 3, 4, 4, 5]) returns [1,2,3,4,5]', () => {
    expect(bbo.unique([1, 2, 2, 3, 4, 4, 5])).toEqual([1, 2, 3, 4, 5]);
  });
  test('bbo.unique([1, 23, 53]) returns [1, 23, 53]', () => {
    expect(bbo.unique([1, 23, 53])).toEqual([1, 23, 53]);
  });
  test("bbo.unique([true, 0, 1, false, false, undefined, null, '']) returns [true, 0, 1, false, false, undefined, null, '']", () => {
    expect(bbo.unique([true, 0, 1, false, false, undefined, null, ''])).toEqual([
      true,
      0,
      1,
      false,
      undefined,
      null,
      ''
    ]);
  });
  test('bbo.unique() returns []', () => {
    expect(bbo.unique()).toEqual([]);
  });
  test('bbo.unique(null) returns []', () => {
    expect(bbo.unique(null)).toEqual([]);
  });
  test('bbo.unique(undefined) returns []', () => {
    expect(bbo.unique(undefined)).toEqual([]);
  });
  test("bbo.unique('strt') returns ['s', 't', 'r']", () => {
    expect(bbo.unique('strt')).toEqual(['s', 't', 'r']);
  });
  test('bbo.unique(1, 1, 2543, 534, 5) throws an error', () => {
    expect(() => {
      bbo.unique(1, 1, 2543, 534, 5);
    }).toThrow();
  });
  test('bbo.unique({}) throws an error', () => {
    expect(() => {
      bbo.unique({});
    }).toThrow();
  });
  test('bbo.unique(true) throws an error', () => {
    expect(() => {
      bbo.unique(true);
    }).toThrow();
  });
  test('bbo.unique(false) throws an error', () => {
    expect(() => {
      bbo.unique(false);
    }).toThrow();
  });
  let start = new Date().getTime();
  bbo.unique([true, 0, 1, false, false, undefined, null, '']);
  let end = new Date().getTime();
  test('bbo.unique([true, 0, 1, false, false, undefined, null]) takes less than 2s to run', () => {
    expect(end - start < 2000).toBeTruthy();
  });
});
