// bbo.randomFromA2B = bbo.randomA2B
const randomA2B = (a, b, int) => {
  let result = Math.random() * (b - a) + a;
  return int ? Math.floor(result) : result;
};

export default randomA2B;
