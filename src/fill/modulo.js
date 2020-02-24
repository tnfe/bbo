/**
 * modulo of a number and a divisor
 */

export default function modulo(n, d) {
  // bbo.modulo(7, 5); // 2
  // bbo.modulo(17, 23); // 17
  // bbo.modulo(16.2, 3.8); // 1
  // bbo.modulo(5.8, 3.4); //2.4
  // bbo.modulo(4, 0); // 4
  // bbo.modulo(-7, 5); // 3
  // bbo.modulo(-2, 15); // 13
  // bbo.modulo(-5.8, 3.4); // 1
  // bbo.modulo(12, -1); // NaN
  // bbo.modulo(-3, -8); // NaN
  // bbo.modulo(12, 'apple'); // NaN
  // bbo.modulo('bee', 9); // NaN
  // bbo.modulo(null, undefined); // NaN

  if (d === 0) {
    return n;
  }
  if (d < 0) {
    return NaN;
  }
  return ((n % d) + d) % d;
}
