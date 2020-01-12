import ua from './ua';

export default function isTenvideo() {
  return /qqlivebrowser/.test(ua()); // 腾讯视频
}
