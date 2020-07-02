/**
 * DeCapitalizes the first letter of a string.
 */

import isString from '../lodash/is_string';
import isNil from '../lodash/is_nil';

function coerceToString(value, defaultValue = '') {
  if (isNil(value)) {
    return defaultValue;
  }
  if (isString(value)) {
    return value;
  }
  return String(value);
}

export default function deCapitalize(subject) {
  const subjectString = coerceToString(subject);
  if (subjectString === '') {
    return '';
  }
  return subjectString.substr(0, 1).toLowerCase() + subjectString.substr(1);
}
