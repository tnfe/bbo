import removeAt from './remove_at';
/**
 * Remove parameter 2 in parameter 1 and return boolean
 */
export default function remove(target, item) {
  let index = target.indexOf(item);
  return index > -1 ? removeAt(target, index) : false;
}
