import reduce from './reduce';
import isArray from './is_array';
import forEach from './for_each';
import has from './has';

// const pick = (obj, arr) =>
//   arr.reduce((acc, curr) => (curr in obj && (acc[curr] = obj[curr]), acc), {});

// Only pick the first-level key,
export default function pick(object, ...paths) {
  if (object === null || object === undefined) {
    return {};
  }
  return reduce(
    paths,
    (rst, path) => {
      if (isArray(path)) {
        forEach(path, (item) => {
          if (has(object, item)) {
            rst[item] = object[item];
          }
        });
      } else {
        if (has(object, path)) {
          rst[path] = object[path];
        }
      }
      return rst;
    },
    {}
  );
}
