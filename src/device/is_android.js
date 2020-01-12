import ua from './ua';
/**
 * detect Android
 * From https://stackoverflow.com/questions/6031412/detect-android-phone-via-javascript-jquery
 */
export default function isAndroid() {
  return ua('l').indexOf('android') > -1;
}
