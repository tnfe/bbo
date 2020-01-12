import getTag from './get_tag';

export default function isNumber(number) {
  return getTag(number) === '[object Number]';
}
