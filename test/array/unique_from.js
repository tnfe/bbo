import bbo from '../bbo';

describe('uniqueFrom', () => {
  test('bbo.uniqueFrom is a Function', () => {
    expect(bbo.uniqueFrom).toBeInstanceOf(Function);
  });

  test('bbo.uniqueFrom works for properties', () => {
    let array = [
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' },
      { name: 'n2', id: '11' }
    ];

    expect(bbo.uniqueFrom(array, 'name')).toEqual([
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' }
    ]);

    expect(bbo.uniqueFrom(array, 'id')).toEqual([
      { name: 'n1', id: '1' },
      { name: 'n2', id: '11' },
      { name: 'n3', id: '12' }
    ]);
  });
});
