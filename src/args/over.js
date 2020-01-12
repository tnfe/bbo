const over = (...fns) => (...args) => fns.map((fn) => fn.apply(null, args));

export default over;
