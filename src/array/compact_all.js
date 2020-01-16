/**
 * Removes falsy values from an array.
 * (false, null, 0, "", undefined, and NaN).
 */
const compactAll = (arr) => arr.filter(Boolean);
export default compactAll;
