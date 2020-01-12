import isString from './is_string';
import stringToPath from './string_to_path';

export default function toPath(value) {
  if (!isString(value)) {
    return [];
  }
  return stringToPath(value);
}
