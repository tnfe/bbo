/* eslint-disable max-nested-callbacks */
import assert from 'assert';
import { identity } from '../const';
import bbo from '../bbo';

describe('debounce', function() {
  it('waits for n ms then runs once', function(done) {
    let callCounter = 0;

    let fn = bbo.debounce(function() {
      callCounter++;
    }, 100);

    for (let i = 0; i < 5; i++) {
      setTimeout(fn, 50);
    }

    setTimeout(function() {
      assert.strictEqual(callCounter, 1);
      done();
    }, 300);
  });

  it('when callFirst is true, runs once, waits for n ms then runs again', function(done) {
    let callCounter = 0;
    let fn = bbo.debounce(
      function() {
        callCounter++;
      },
      100,
      true
    );

    fn();
    for (let i = 0; i < 5; i++) {
      setTimeout(fn, 50);
    }

    assert.equal(callCounter, 1);

    setTimeout(function() {
      assert.equal(callCounter, 2);
      done();
    }, 300);
  });

  it('invokes repeatedly when call intervals > than wait time', function(done) {
    let callCounter = 0;
    let fn = bbo.debounce(function() {
      callCounter++;
    }, 100);

    let runAndTest = function(expectedCounter) {
      fn();
      assert.equal(callCounter, expectedCounter);
    };

    fn();
    setTimeout(function() {
      runAndTest(1);
      setTimeout(function() {
        runAndTest(2);
        setTimeout(function() {
          runAndTest(3);
          setTimeout(function() {
            runAndTest(4);
            done();
          }, 200);
        }, 200);
      }, 200);
    }, 200);
  });

  it('invokes repeatedly when wait is 0', function(done) {
    let callCounter = 0;
    let fn1 = bbo.debounce(function() {
      callCounter++;
    }, 0);

    fn1();
    assert.equal(callCounter, 1);
    fn1();
    assert.equal(callCounter, 2);
    fn1();
    assert.equal(callCounter, 3);
    done();
  });

  it('invokes repeatedly when wait is falsey', function(done) {
    let callCounter = 0;
    let fn1 = bbo.debounce(function() {
      callCounter++;
    });

    fn1();
    fn1();
    fn1();

    setTimeout(function() {
      assert.equal(callCounter, 3);
      done();
    }, 200);
  });

  it('subsequent debounced calls return the last `func` result', function(done) {
    let debounced = bbo.debounce(identity, 32);
    debounced('a');

    setTimeout(function() {
      assert.notStrictEqual(debounced('b'), 'b');
    }, 64);

    setTimeout(function() {
      assert.notStrictEqual(debounced('c'), 'c');
      done();
    }, 128);
  });
});
