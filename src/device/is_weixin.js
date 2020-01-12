import ua from './ua';

export default function isWeixin() {
  return /MicroMessenger/i.test(ua('l')); // 微信
}
