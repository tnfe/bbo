import bbo from '../bbo';

describe('pluck', () => {
  const array = [{ a: 1 }, { a: 2 }];

  it('base case', () => {
    expect(bbo.pluck(array, 'a')).toEqual([1, 2]);
  });

  it('base case2', () => {
    expect(bbo.pluck(array)).toEqual([]);
  });
});
