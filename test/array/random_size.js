import bbo from '../bbo';
import { deburredLetters } from '../const';

describe('random', () => {
  const random = bbo.randomSize(deburredLetters, Math.floor(Math.random() * 50) + 1);
  it('base case', () => {
    expect(bbo.includesAll(deburredLetters, random)).toBe(true);
    expect(bbo.randomSize([1])).toEqual([1]);
    expect(bbo.randomSize([])).toEqual([]);
  });
});
