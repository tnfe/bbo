import getTag from './get_tag';

export default function isSymbol(symbol) {
  return getTag(symbol) === '[object Symbol]';
}
