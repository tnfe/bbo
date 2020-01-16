import underscored from './underscored';
/**
 * Turn '_' in a string into '-'
 */
export default function dasherize(target) {
  return underscored(target).replace(/_/g, '-');
}
