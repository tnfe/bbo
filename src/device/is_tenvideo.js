import ua from './ua';

export default function isTenvideo() {
  return /qqlivebrowser/.test(ua('l')); // 腾讯视频
}
