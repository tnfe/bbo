import isObject from '../lodash/is_object';

const properObject = (o) => (isObject(o) && !o.hasOwnProperty ? { ...o } : o);

export default properObject;
