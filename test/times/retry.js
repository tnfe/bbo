/* eslint-disable no-param-reassign */
/* eslint-disable no-throw-literal */
import bbo from '../bbo';

const wait = (time = 500) => {
  return new Promise((rs, rj) => {
    setTimeout(rs, time);
  });
};

const waiReject = (time = 500) => {
  return new Promise((rs, rj) => {
    setTimeout(rj, time);
  });
};

/**
 * 概率成功的返回
 *
 * @param {any} n 第N次必成功返回
 */
const createProbabilityWait = (n, isAsync = true, totalTime = 200) => {
  let time = totalTime / n;
  return () => {
    if (n-- > 1) {
      console.log('reject');
      if (isAsync) {
        return waiReject(time);
      } else {
        throw 'reject...';
      }
    } else {
      // console.log('resovle')
      if (isAsync) {
        return wait(time);
      } else {
        return 'success.';
      }
    }
  };
};

describe('retry ', () => {
  it('retry 1 (50ms)', (done) => {
    bbo.retry(createProbabilityWait(1, true, 50)).then(
      () => {
        done();
      },
      () => {
        throw 'error';
      }
    );
  });

  it('retry 1', (done) => {
    bbo.retry(createProbabilityWait(1)).then(
      () => {
        done();
      },
      () => {
        throw 'error';
      }
    );
  });

  it('retry 2', (done) => {
    bbo.retry(createProbabilityWait(2), { interval: 50 }).then(
      () => {
        done();
      },
      () => {
        throw 'error';
      }
    );
  });

  it('retry 3', (done) => {
    bbo.retry(createProbabilityWait(3), { retries: 4, interval: 50 }).then(
      () => {
        done();
      },
      () => {
        throw 'error';
      }
    );
  });

  it('retry 3 sync', (done) => {
    bbo
      .retry(createProbabilityWait(3, false), {
        retries: 4,
        interval: 50
      })
      .then(
        () => {
          done();
        },
        () => {
          throw 'error';
        }
      );
  });

  it('retry timout', function(done) {
    let i = 0;
    bbo
      .retry(
        () => {
          if (i === 0) {
            i++;
            // console.log('----->0')
            return wait(1500);
          } else if (i === 1) {
            i++;
            // console.log('----->1')
            return waiReject(50);
          } else {
            i++;
            // console.log('----->2')
            return wait(10);
          }
        },
        { retries: 3, timeout: 500, interval: 50 }
      )
      .then(
        () => {
          expect(i).toBe(3);
          done();
        },
        (err) => {
          console.log('--->', err);
          throw 'error';
        }
      );
  });
});
