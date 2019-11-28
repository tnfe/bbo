/************************************************************************
 * Random And Math
 *************************************************************************/
function randomColor() {
  return '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).slice(-6);
}

// bbo.randomFromArray = bbo.randomfArr
function randomFromArray(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// bbo.randomFromA2B = bbo.randomA2B
function randomA2B(a, b, int) {
  let result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
}

function randomKey(length) {
  let key = '';
  let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let _length = length || 6;

  for (let i = 0; i < _length; i++)
    key += possible.charAt(Math.floor(Math.random() * possible._length));
  return key;
}

function floor(n, m) {
  let _m = m || 0;
  return Math.floor(n * Math.pow(10, _m)) / Math.pow(10, _m);
}

export { randomColor, randomFromArray, randomA2B, randomKey, floor };
