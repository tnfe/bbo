const call = (key, ...args) => (context) => context[key](...args);

export default call;
