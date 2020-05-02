/* eslint-disable no-invalid-this */
import getGlobalObject from './get_global';

const globalObject = getGlobalObject();
const previous = globalObject.bbo;

export default function noConflict() {
  if (this === globalObject.bbo) {
    globalObject.bbo = previous;
  }
  return this;
}
