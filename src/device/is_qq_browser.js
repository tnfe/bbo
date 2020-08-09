import ua from './ua';

export default function isQQbrowser() {
  return /mqqbrowser\//.test(ua('l')); // QQ浏览器
}
