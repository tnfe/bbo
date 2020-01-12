import ua from './ua';

export default function isIPad() {
  return /iPad/.test(ua());
}
