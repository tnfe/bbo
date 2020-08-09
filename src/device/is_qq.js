import ua from './ua';

export default function isQQ() {
  return /qq\//.test(ua('l')); // 手机QQ
}
