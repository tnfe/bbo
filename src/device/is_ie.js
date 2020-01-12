import ieVersion from './ie_version';

export default function isIE() {
  return ieVersion() > 0;
}
