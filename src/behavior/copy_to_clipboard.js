import attr from '../bom/attr';
import setStyle from '../bom/set_style';

export default function copyToClipboard(str) {
  const el = document.createElement('textarea');
  el.value = str;
  attr(el, 'readonly', '');
  setStyle(el, 'position', 'absolute');
  setStyle(el, 'left', '-9999px');
  document.body.appendChild(el);
  const selected =
    document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false;
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  if (selected) {
    document.getSelection().removeAllRanges();
    document.getSelection().addRange(selected);
  }
}
