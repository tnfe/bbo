import { performance } from 'perf_hooks';
import bbo from '../bbo';

describe('sleep', function() {
  test('async await', async () => {
    const start = performance.now();
    await bbo.sleep(20);
    expect(performance.now() - start).toBeGreaterThanOrEqual(19);
  });

  test('then', async () => {
    const start = performance.now();
    return bbo.sleep(20).then(() => {
      expect(performance.now() - start).toBeGreaterThanOrEqual(19);
    });
  });

  test('promise chain value passing', async () =>
    Promise.resolve()
      .then(() => 'test')
      .then(bbo.sleep(20))
      .then((value) => {
        expect(value).toEqual('test');
      }));

  test('promise chain bbo.sleeping', async () => {
    const start = performance.now();

    return Promise.resolve()
      .then(bbo.sleep(20))
      .then(() => {
        expect(performance.now() - start).toBeGreaterThanOrEqual(19);
      });
  });

  test('delayed bbo.sleep', async () => {
    const start = performance.now();

    const sleepPromise = bbo.sleep(20);
    await bbo.sleep(20);

    return sleepPromise.then(() => {
      const end = performance.now();

      expect(end - start).toBeGreaterThanOrEqual(19);
      expect(end - start).toBeLessThan(30);
    });
  });

  test('delayed promise chain bbo.sleeping', async () => {
    const start = performance.now();

    const sleepPromise = bbo.sleep(20);

    return (
      bbo
        .sleep(20)
        .then(() => 'test')
        // Must not bbo.sleep again because 'sleepPromise' is already resolved
        .then(sleepPromise)
        .then(() => {
          const end = performance.now();

          expect(end - start).toBeGreaterThanOrEqual(19);
          expect(end - start).toBeLessThan(30);
        })
    );
  });

  test('delayed promise chain value passing', async () => {
    const sleepPromise = bbo.sleep(0);

    return bbo
      .sleep(0)
      .then(() => 'test')
      .then(sleepPromise)
      .then((value) => {
        expect(value).toEqual('test');
      });
  });

  test('call global setTimeout (default)', async () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');
    await bbo.sleep(0);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });

  test('call cached setTimeout', async () => {
    const spySetTimeout = jest.spyOn(global, 'setTimeout');

    // Replace global setTimeout
    jest.useFakeTimers();

    await bbo.sleep(0, {
      useCachedSetTimeout: true
    });

    expect(setTimeout).toHaveBeenCalledTimes(0);
    expect(spySetTimeout).toHaveBeenCalledTimes(1);
  });
});
