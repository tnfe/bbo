/**
 * Replaces all but the last num of characters with the specified mask character.
 */
const mask = (cc, num = 4, mask = '*') => `${cc}`.slice(-num).padStart(`${cc}`.length, mask);
export default mask;
