import bbo from '../bbo';

describe('hasOwnProperty', () => {
  test('bbo.hasOwnProperty is a Function', () => {
    expect(bbo.hasOwnProperty).toBeInstanceOf(Function);
  });

  test('should pass example 1', () => {
    const object = {};
    object.property1 = 42;

    expect(bbo.hasOwnProperty(object, 'property1')).toBe(true);
    expect(bbo.hasOwnProperty(object, 'toString')).toBe(false);
  });
});
