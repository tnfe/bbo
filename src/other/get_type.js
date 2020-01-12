const getType = (v) =>
  v === undefined ? 'undefined' : v === null ? 'null' : v.constructor.name.toLowerCase();

export default getType;
