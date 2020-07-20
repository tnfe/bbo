import bbo from '../bbo';

describe('chain', function() {
  it('should calculate the result using explicit chaining', function() {
    expect(bbo.chain('Hello world').value()).toBe('Hello world');
    expect(
      bbo
        .chain('  Hello world  ')
        .trim()
        .value()
    ).toBe('Hello world');

    expect(
      bbo
        .chain(' to-upper-case ')
        .trim()
        .camelize()
        .value()
    ).toBe('toUpperCase');

    expect(
      bbo
        .chain([1, 1, 2, 3, 4, 2])
        .unique()
        .split(2)
        .value()
    ).toEqual([
      [1, 2],
      [3, 4]
    ]);
  });

  it('wrapper object', function() {
    const obj = { a: { aa: { aaa: 2 } }, b: 4 };
    expect(
      JSON.stringify(
        bbo
          .chain(obj)
          .get('a')
          .get('aa')
          .value()
      )
    ).toBe('{"aaa":2}');
  });
});
