/**
 * splitLines('This\nis a\nmultiline\nstring.\n') =>
 * ['This', 'is a', 'multiline', 'string.' , '']
 */
export default function splitLines(str) {
  return str.split(/\r?\n/);
}
