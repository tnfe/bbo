/**
 * Returns the length of a string in bytes.
 */
export default function byteSize(str) {
  return new Blob([str]).size;
}
