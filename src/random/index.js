/************************************************************************
 * Random And Math
 *************************************************************************/
const randomColor = () => {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
};

// bbo.randomFromA2B = bbo.randomA2B
const randomA2B = (a, b, int) => {
  let result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

const randomKey = (len = 32) => {
  /** Removed confusing characters 'oOLl,9gq,Vv,Uu,I1' **/
  let possible = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
  let key = '';
  for (let i = 0; i < len; i++) {
    key += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return key;
};

const floor = (n, m = 0) => {
  return Math.floor(n * Math.pow(10, m)) / Math.pow(10, m);
};

export { randomColor, randomA2B, randomKey, floor };
