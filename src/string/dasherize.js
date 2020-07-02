import underscored from './underscored';
/**
 * Turn '_' in a string into '-'
 */
export default function dasherize(target) {
  return underscored(String(target)).replace(/_/g, '-');
}
