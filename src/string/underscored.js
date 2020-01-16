/**
 * Turn CamelCase to '_'
 */
export default function underscored(target) {
  return target.replace(/([a-z0-9])([A-Z])/g, '$1_$2').toLowerCase();
}
