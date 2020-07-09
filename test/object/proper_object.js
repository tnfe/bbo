import bbo from '../bbo';

describe('properObject', () => {
  it('returns given object when object has keys and hasOwnProperty function', () => {
    const o = { a: 1 };
    const a = [1];
    expect(bbo.properObject(o)).toBe(o);
    expect(bbo.properObject(a)).toBe(a);
  });

  it('returns given value when value is not an object', () => {
    const o = 'hello';
    expect(bbo.properObject(o)).toBe(o);
  });

  it('returns object that has given keys and hasOwnProperty function when given object is created from a null', () => {
    const o = Object.create(null);
    o.a = 1;
    const actual = bbo.properObject(o);
    expect(actual).toEqual({ a: 1 });
    expect(typeof actual.hasOwnProperty === 'function').toBe(true);
    expect(actual).not.toBe(o);
  });
});
