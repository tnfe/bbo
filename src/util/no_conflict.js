/* eslint-disable no-invalid-this */
import getGlobalObject from './get_global';

const globalObject = getGlobalObject();
const previousV = globalObject.v;

export default function noConflict() {
  if (this === globalObject.v) {
    globalObject.v = previousV;
  }
  return this;
}
