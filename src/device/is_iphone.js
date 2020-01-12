import ua from './ua';

export default function iPhone() {
  return /iPhone/.test(ua());
}
