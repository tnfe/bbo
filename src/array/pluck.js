/**
 * Get the attribute values in an array object and combine them into a new array
 */
export default function pluck(target, name) {
  let result = [];
  let temp;
  target.forEach(function(item) {
    temp = item[name];
    if (temp !== null) {
      result.push(temp);
    }
  });
  return result;
}
