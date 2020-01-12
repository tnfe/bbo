import getTag from './get_tag';

export default function isString(str) {
  return getTag(str) === '[object String]';
}
