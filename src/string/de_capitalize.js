/**
 * DeCapitalizes the first letter of a string.
 */

const deCapitalize = ([first, ...rest], upperRest = false) =>
  first.toLowerCase() + (upperRest ? rest.join('').toUpperCase() : rest.join(''));

export default deCapitalize;
