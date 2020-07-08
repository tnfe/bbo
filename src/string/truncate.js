/**
 * Truncates a string up to a specified length.
 * The default length is 3, and the truncated symbol defaults '...'
 */
import size from '../collection/size';
const truncate = (str, num = 3) => {
  const len = size(str);
  return len > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
};

export default truncate;
