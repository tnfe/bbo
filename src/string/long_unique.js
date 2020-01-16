/**
 * Long string unique
 */
export default function longUnique(target) {
  let json = {};
  for (let index = 0; index < target.length; index++) {
    if (!json[target[index]]) {
      json[target[index]] = -1;
    }
  }
  let longString = '';
  for (let index = 0; index < target.length; index++) {
    if (json[target[index]]) {
      json[target[index]] = 0;
      longString = longString + target[index];
    }
  }
  return longString;
}
