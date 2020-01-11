/* eslint-disable no-invalid-this */
import functions from 'functions';

function ChainWrapper(subject, explicitChain) {
  this._wrappedValue = subject;
  this._explicitChain = explicitChain;
}

ChainWrapper.prototype.value = function() {
  return this._wrappedValue;
};

ChainWrapper.prototype.valueOf = function() {
  return this.value();
};

ChainWrapper.prototype.toJSON = function() {
  return this.value();
};

ChainWrapper.prototype.toString = function() {
  return String(this.value());
};

ChainWrapper.prototype.chain = function() {
  return new ChainWrapper(this._wrappedValue, true);
};

ChainWrapper.prototype.thru = function(changer) {
  if (typeof changer === 'function') {
    return new ChainWrapper(changer(this._wrappedValue), this._explicitChain);
  }
  return this;
};

ChainWrapper.prototype._explicitChain = true;

function makeFunctionChainable(functionInstance) {
  return function(...args) {
    const result = functionInstance(this._wrappedValue, ...args);
    if (this._explicitChain || typeof result === 'string') {
      return new ChainWrapper(result, this._explicitChain);
    } else {
      return result;
    }
  };
}

Object.keys(functions).forEach(function(name) {
  ChainWrapper.prototype[name] = makeFunctionChainable(functions[name]);
});

export default ChainWrapper;
