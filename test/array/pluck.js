import bbo from '../bbo';

describe('pluck', () => {
  const objects = [{ a: 1 }, { a: 2 }];

  it('base case', () => {
    expect(bbo.pluck(objects, 'a')).toEqual([1, 2]);
  });
});
