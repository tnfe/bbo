/**
 * _ or - to CamelCase
 */
export default function camelize(target) {
  if (target.indexOf('-') < 0 && target.indexOf('_') < 0) {
    return target;
  }
  return target.replace(/[-_][^-_]/g, function(match) {
    return match.charAt(1).toUpperCase();
  });
}
