import getTag from './get_tag';

export default function isFunction(func) {
  return getTag(func) === '[object Function]';
}
