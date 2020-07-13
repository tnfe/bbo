import bbo from '../bbo';

describe('union', () => {
  test('union is a Function', () => {
    expect(bbo.union).toBeInstanceOf(Function);
  });

  test('bbo.union([1, 2, 3], [4, 3, 2]) returns [1, 2, 3, 4]', () => {
    expect(bbo.union([1, 2, 3], [4, 3, 2])).toEqual([1, 2, 3, 4]);
  });

  test("bbo.union('str', 'asd') returns [ 's', 't', 'r', 'a', 'd' ]", () => {
    expect(bbo.union('str', 'asd')).toEqual(['s', 't', 'r', 'a', 'd']);
  });

  test('bbo.union([[], {}], [1, 2, 3]) returns [[], {}, 1, 2, 3]', () => {
    expect(bbo.union([[], {}], [1, 2, 3])).toEqual([[], {}, 1, 2, 3]);
  });

  test('bbo.union([], []) returns []', () => {
    expect(bbo.union([], [])).toEqual([]);
  });

  test('bbo.union() throws an error', () => {
    expect(() => {
      bbo.union();
    }).toThrow();
  });

  test("bbo.union(true, 'str') throws an error", () => {
    expect(() => {
      bbo.union(true, 'str');
    }).toThrow();
  });

  test("bbo.union('false', true) throws an error", () => {
    expect(() => {
      bbo.union('false', true);
    }).toThrow();
  });

  test('bbo.union((123, {}) throws an error', () => {
    expect(() => {
      bbo.union(123, {});
    }).toThrow();
  });

  test('bbo.union([], {}) throws an error', () => {
    expect(() => {
      bbo.union([], {});
    }).toThrow();
  });

  test('bbo.union(undefined, null) throws an error', () => {
    expect(() => {
      bbo.union(undefined, null);
    }).toThrow();
  });

  let start = new Date().getTime();
  bbo.union([1, 2, 3], [4, 3, 2]);

  let end = new Date().getTime();

  test('bbo.union([1, 2, 3], [4, 3, 2]) takes less than 2s to run', () => {
    expect(end - start < 2000).toBeTruthy();
  });
});
