import getTag from './get_tag';

export default function isSet(set) {
  return getTag(set) === '[object Set]';
}
