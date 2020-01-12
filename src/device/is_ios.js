import ua from './ua';
/**
 * detect IOS
 * From https://stackoverflow.com/questions/9038625/detect-if-device-is-ios
 * more see:
 * https://github.com/madrobby/zepto/blob/master/src/detect.js#files
 */

export default function isIOS() {
  return /iPad|iPhone|iPod/.test(ua());
}
