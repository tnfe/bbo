/* eslint-disable max-nested-callbacks */
import bbo from '../bbo';
import assert from 'assert';

describe('throttle', function() {
  test('runs once after every n ms - part 1', function() {
    let callCounter = 0;
    let fn = bbo.throttle(function() {
      callCounter++;
    }, 70);

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 1);
          }, 40);
        }, 40);
      }, 40);
    }, 40);
  });

  test('runs once after every n ms - part 2', function() {
    let callCounter = 0;
    let fn = bbo.throttle(function() {
      callCounter++;
    }, 70);

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 2);
          }, 100);
        }, 40);
      }, 40);
    }, 40);
  });

  test('when callFirst is true, runs once at beginning of every n ms - part1', function() {
    let callCounter = 0;
    let fn = bbo.throttle(
      function() {
        callCounter++;
      },
      70,
      true
    );

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 2);
          }, 40);
        }, 40);
      }, 40);
    }, 40);
  });

  test('when callFirst is true, runs once at beginning of every n ms - part2', function() {
    let callCounter = 0;
    let fn = bbo.throttle(
      function() {
        callCounter++;
      },
      70,
      true
    );

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 3);
          }, 200);
        }, 40);
      }, 40);
    }, 40);
  });

  test('invokes repeatedly when wait is 0', function() {
    let callCounter = 0;
    let fn = bbo.throttle(
      function() {
        callCounter++;
      },
      0,
      true
    );

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 4);
          }, 40);
        }, 40);
      }, 40);
    }, 40);
  });

  test('invokes repeatedly when call intervals > than wait time', function() {
    let callCounter = 0;
    let fn = bbo.throttle(
      function() {
        callCounter++;
      },
      30,
      true
    );

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 4);
          }, 40);
        }, 40);
      }, 40);
    }, 40);
  });

  test('invokes repeatedly when wait is falsey', function() {
    let callCounter = 0;
    let fn = bbo.throttle(
      function() {
        callCounter++;
      },
      NaN,
      true
    );

    setTimeout(function() {
      fn();
      setTimeout(function() {
        fn();
        setTimeout(function() {
          fn();
          setTimeout(function() {
            fn();
            assert.strictEqual(callCounter, 4);
          }, 40);
        }, 40);
      }, 40);
    }, 40);
  });
});
