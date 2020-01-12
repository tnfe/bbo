export default function ua(lower) {
  return lower ? window.navigator.userAgent.toLowerCase() : window.navigator.userAgent;
}
