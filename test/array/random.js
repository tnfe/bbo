import bbo from '../bbo';
import { deburredLetters } from '../const';

describe('random', () => {
  const random = bbo.random(deburredLetters);
  it('base case', () => {
    expect(bbo.contains(deburredLetters, random)).toBe(true);
  });
});
