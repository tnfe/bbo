/* eslint-disable */
const pick = (obj, arr) =>
  arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

export default pick;
