import ua from './ua';

export default function mqqbrowser() {
  return /mqqbrowser\//.test(ua()); // QQ浏览器
}
