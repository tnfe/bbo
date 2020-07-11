/**
 * Counts the occurrences of a value in an array.
 */
const countOccurrences = (arr, val) => {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
};

export default countOccurrences;
