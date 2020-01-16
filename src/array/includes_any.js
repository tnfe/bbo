/**
 * Returns true if at least one element of values is included in arr , false otherwise.
 */
const includesAny = (arr, values) => values.some((v) => arr.includes(v));

export default includesAny;
