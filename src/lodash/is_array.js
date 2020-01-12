import getTag from './get_tag';

export default function isArray(arr) {
  return getTag(arr) === '[object Array]';
}
