import getTag from './get_tag';

export default function isObject(obj) {
  return getTag(obj) === '[object Object]';
}
