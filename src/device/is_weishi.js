import ua from './ua';

export default function isWeiShi() {
  return /weishi/.test(ua('l')); // 腾讯微视
}
