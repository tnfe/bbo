import ua from './ua';

export default function isNewsApp() {
  return /qqnews/.test(ua()); // 腾讯新闻app
}
