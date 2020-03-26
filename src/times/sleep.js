const cachedSetTimeout = setTimeout;

function createSleepPromise(timeout, { useCachedSetTimeout }) {
  const timeoutFunction = useCachedSetTimeout ? cachedSetTimeout : setTimeout;

  return new Promise((resolve) => {
    timeoutFunction(resolve, timeout);
  });
}

export default function sleep(timeout, { useCachedSetTimeout } = {}) {
  const sleepPromise = createSleepPromise(timeout, { useCachedSetTimeout });

  function promiseFunction(value) {
    return sleepPromise.then(() => value);
  }

  promiseFunction.then = (...args) => sleepPromise.then(...args);
  promiseFunction.catch = Promise.resolve().catch;

  return promiseFunction;
}
