import ua from './ua';

export default function isQQ() {
  return /qq\//.test(ua()); // 手机QQ
}
