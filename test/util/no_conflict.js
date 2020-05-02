import getGlobalObject from '../../src/util/get_global';
import bboLibrary from '../bbo';

describe('noConflict', function() {
  it('should return bbo library instance and restore bbo global variable', function() {
    const globalObject = getGlobalObject();
    globalObject.bbo = bboLibrary;
    const bbo = bboLibrary.noConflict();
    expect(bbo).toBe(bboLibrary);
    expect(globalObject.bbo).toBe(undefined);
  });

  it('should return bbo library instance and not modify bbo global variable', function() {
    const globalObject = getGlobalObject();
    const bbo = bboLibrary.noConflict();
    expect(bbo).toBe(bboLibrary);
    expect(globalObject.bbo).toBe(undefined);
  });
});
