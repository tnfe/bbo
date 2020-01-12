import getTag from './get_tag';

export default function isMap(map) {
  return getTag(map) === '[object Map]';
}
