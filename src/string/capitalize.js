/**
 * Capitalizes the first letter of a string.
 */
export default function capitalize(target) {
  return target.charAt(0).toUpperCase() + target.slice(1).toLowerCase();
}
