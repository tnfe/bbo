import { version } from '../package.json';
import {
  ua,
  isIOS,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  mqqbrowser
} from './detecting/index';

/**
 * Main entry
 */

let ppo = {
  // version
  version,
  // detecting
  ua,
  isIOS,
  isIos: isIOS,
  isiPhone,
  isIPad,
  isAndroid,
  isMobile,
  isPC,
  isWeixin,
  isNewsApp,
  isQQ,
  isTenvideo,
  isIphoneXmodel,
  ieVersion,
  isIE,
  mqqbrowser
};

export default ppo;
