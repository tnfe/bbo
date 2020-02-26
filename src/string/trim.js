/**
 * Remove spaces after removing previous string
 */
import isEmpty from '../lodash/is_empty';

export default function trim(str) {
  if (isEmpty(str)) {
    return str;
  }
  return str.replace(/(^\s*)|(\s*$)/g, '');
}
