/**
 * Creates a new string with the results of calling a provided function
 * on every character in the calling string.
 */
const mapString = (str, fn) =>
  str
    .split('')
    .map((c, i) => fn(c, i, str))
    .join('');

export default mapString;
