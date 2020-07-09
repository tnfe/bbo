import bbo from '../bbo';

describe('chunk', () => {
  it('base case', () => {
    expect(
      bbo.column(
        [
          { name: 'a', value: 1 },
          { name: 'b', value: 2 },
          { name: 'c', value: 3 }
        ],
        'name'
      )
    ).toEqual({ 0: 'a', 1: 'b', 2: 'c' });

    expect(
      bbo.column(
        {
          0: { name: 'a', value: 1 },
          1: { name: 'b', value: 2 },
          2: { name: 'c', value: 3 }
        },
        'name'
      )
    ).toEqual({ 0: 'a', 1: 'b', 2: 'c' });

    expect(
      bbo.column(
        [
          { name: 'a', value: 1 },
          { name: 'b', value: 2 },
          { name: 'c', value: 3 }
        ],
        'name',
        'value'
      )
    ).toEqual({ 1: 'a', 2: 'b', 3: 'c' });

    expect(
      bbo.column(
        [
          { name: 'a', value: 1 },
          { name: 'b', value: 2 },
          { name: 'c', value: 3 }
        ],
        null,
        'value'
      )
    ).toEqual({
      1: { name: 'a', value: 1 },
      2: { name: 'b', value: 2 },
      3: { name: 'c', value: 3 }
    });
  });
});
