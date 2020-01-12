import getTag from './get_tag';

export default function isBoolean(bool) {
  return getTag(bool) === '[object Boolean]';
}
