import bbo from '../bbo';

describe('uniqueBy', () => {
  test('bbo.uniqueBy is a Function', () => {
    expect(bbo.uniqueBy).toBeInstanceOf(Function);
  });

  test('bbo.uniqueBy works for properties', () => {
    expect(
      bbo.uniqueBy(
        [
          { id: 0, value: 'a' },
          { id: 1, value: 'b' },
          { id: 2, value: 'c' },
          { id: 1, value: 'd' },
          { id: 0, value: 'e' }
        ],
        (a, b) => a.id === b.id
      )
    ).toEqual([
      { id: 0, value: 'a' },
      { id: 1, value: 'b' },
      { id: 2, value: 'c' }
    ]);
  });

  test('bbo.uniqueBy works for nested properties', () => {
    expect(
      bbo.uniqueBy(
        [
          { id: 0, value: 'a', n: { p: 0 } },
          { id: 1, value: 'b', n: { p: 1 } },
          { id: 2, value: 'c', n: { p: 2 } },
          { id: 1, value: 'd', n: { p: 0 } },
          { id: 0, value: 'e', n: { p: 1 } }
        ],
        (a, b) => a.id === b.id
      )
    ).toEqual([
      { id: 0, value: 'a', n: { p: 0 } },
      { id: 1, value: 'b', n: { p: 1 } },
      { id: 2, value: 'c', n: { p: 2 } }
    ]);
  });
});
