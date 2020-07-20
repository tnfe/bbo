import bbo from '../bbo';

describe('indexBy', () => {
  const array = [
    { id: 'first', val: 1 },
    { id: 'second', val: 2 }
  ];

  it('base case', () => {
    expect(bbo.indexBy(array, 'id')).toEqual({
      first: { id: 'first', val: 1 },
      second: { id: 'second', val: 2 }
    });

    expect(bbo.indexBy([{ id: 'first', val: 1 }, null], 'id')).toEqual({
      first: { id: 'first', val: 1 }
    });

    expect(bbo.indexBy([], 'id')).toEqual({});
  });

  test('bbo.indexBy !isArray throws an error', () => {
    expect(() => {
      bbo.indexBy('', 1);
    }).toThrow();

    expect(() => {
      bbo.indexBy([], []);
    }).toThrow();
  });
});
