/* eslint-disable guard-for-in */
import isArray from './is_array';
import isObject from './is_object';
import isDate from './is_date';

export default function isShallowEqual(...objs) {
  if (objs.length < 2) return false;
  for (let i in objs) {
    i = Number(i);
    if (objs[i + 1] !== undefined) {
      if (isArray(objs[i])) {
        if (!compareArrays(objs[i], objs[i + 1])) {
          return false;
        }
      } else if (isObject(objs[i])) {
        if (!compareObjects(objs[i], objs[i + 1])) {
          return false;
        }
      } else if (isDate(objs[i])) {
        if (!compareDates(objs[i], objs[i + 1])) {
          return false;
        }
      } else {
        if (objs[i] !== objs[i + 1]) {
          return false;
        }
      }
    }
  }

  return true;
}

function compare(obj, obj1) {
  for (let i in obj) {
    if (obj1[i] === undefined) {
      return false;
    }
    if (isArray(obj[i])) {
      if (!compareArrays(obj[i], obj1[i])) {
        return false;
      }
    } else if (isObject(obj[i])) {
      if (!compareObjects(obj[i], obj1[i])) {
        return false;
      }
    } else if (isDate(obj[i])) {
      if (!compareDates(obj[i], obj1[i])) {
        return false;
      }
    } else {
      if (obj[i] !== obj1[i]) {
        return false;
      }
    }
  }
  return true;
}

function compareArrays(obj, obj1) {
  if (!isArray(obj1)) return false;
  if (obj.length !== obj1.length) return false;
  let equal = compare(obj, obj1);
  return equal;
}

function compareObjects(obj, obj1) {
  if (!isObject(obj1)) return false;
  for (let key in obj1) {
    if (obj[key] === undefined) {
      return false;
    }
  }
  let equal = compare(obj, obj1);
  return equal;
}

function compareDates(obj, obj1) {
  if (!isDate(obj1) || obj.getTime() !== obj1.getTime()) {
    return false;
  }
  return true;
}
