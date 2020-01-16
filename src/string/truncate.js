/**
 * Truncates a string up to a specified length.
 * The default length is 3, and the truncated symbol defaults '...'
 */
const truncate = (str, num) =>
  str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;

export default truncate;
