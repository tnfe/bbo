/**
 * Capitalizes the first letter of a string.
 */
export default function capitalize(target) {
  return (
    String(target)
      .charAt(0)
      .toUpperCase() +
    String(target)
      .slice(1)
      .toLowerCase()
  );
}
