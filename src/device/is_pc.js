import isMobile from './is_mobile';

/**
 * detect PC / Mobile
 * From https://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
 */
export default function isPC() {
  return !isMobile();
}
