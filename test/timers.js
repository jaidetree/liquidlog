/* global describe, it */
import assert from 'assert';
import Timers from '../src/timers';

function duration(start=Date.now(), end=null, name='test') {
  return { name: name, start: start, end: end };
}

function ms(x=0) {
  return x;
}

function s(x=1) {
  return ms(1000) * x;
}

function min(x=1) {
  return s(60) * x;
}

function h(x=1) {
  return min(60) * x;
}

function d(x=1) {
  return h(24) * x;
}

function m(x=1) {
  let adj = x % 2;
  return d(30) * x + d(Math.floor(x / 2) + adj);
}

function y(x=1) {
  return d(365) * x;
}


describe('Timers', () => {
  describe('#constructor', () => {
    it('should create instances of timers', () => {
      let timers = new Timers();
      assert.ok(timers instanceof Timers);
    });

    it('should have methods', () => {
      let methods = Object.getOwnPropertyNames(Timers.prototype);
      assert.deepEqual(methods, ['constructor', 'diff', 'elapsed', 'get', 'start', 'stop']);
    });
  });

  describe('#diff', () => {
    it('should return an accurate integer', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = Date.now() + ms(500),
          diff = timers.diff(duration(start, end));

      assert.ok(!isNaN(diff));
      assert.ok(diff > 0);
      assert.equal(diff, 500);
    });
  });

  describe('#elapsed', () => {
    it('should produce an accurate string', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = start + 1005,
          elapsed = timers.elapsed(duration(start, end));

      assert.equal(elapsed, `1s 5ms`);
    });

    it('should show hours and minutes', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = start + h() + min() + s() + ms(5),
          elapsed = timers.elapsed(duration(start, end));

      assert.equal(elapsed, `1h 1min 1s 5ms`);
    });

    it('should hide seconds and ms when empty', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = start + h() + min(3),
          elapsed = timers.elapsed(duration(start, end));

      assert.equal(elapsed, `1h 3min`);
    });

    it('should support months', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = start + m(2) + min(3),
          elapsed = timers.elapsed(duration(start, end));

      assert.equal(elapsed, `2m 3min`);
    });

    it('should support years', () => {
      let timers = new Timers(),
          start = Date.now(),
          end = start + y(2) + m(5) + min(3) + s(5),
          elapsed = timers.elapsed(duration(start, end));

      assert.equal(elapsed, `2y 5m 3min 5s`);
    });
  });

  describe('#get()', () => {
    it('should return a duration object', () => {
      let timers = new Timers(),
          duration;
      timers.start('test');
      duration = timers.get('test');
      assert.equal(duration.name, 'test');
      assert.equal(duration.start, parseInt(duration.start, 10));
      assert.equal(duration.end, null);
      assert.ok(duration.start <= Date.now());
    });
  });

  describe('#start()', () => {
    it('should create a timer', () => {
      let timers = new Timers(),
        duration;
      timers.start('test');
      duration = timers.durations[0];
      assert.equal(duration.name, 'test');
      assert.equal(duration.start, parseInt(duration.start, 10));
      assert.equal(duration.end, null);
      assert.ok(duration.start <= Date.now());
    });

    it('should return a unix timestamp', () => {
      let timers = new Timers(),
          time = Date.now(),
          output = timers.start('test');

      assert.equal(time, output);
    });

    it('should support empty name', () => {
      let timers = new Timers(),
        duration;
      timers.start();
      duration = timers.durations[0];
      assert.equal(duration.name, 0);
      assert.equal(duration.start, parseInt(duration.start, 10));
      assert.equal(duration.end, null);
      assert.ok(duration.start <= Date.now());
    });
  });

  describe('#stop()', () => {
    it('should stop a timer', (done) => {
      let timers = new Timers(),
          start = Date.now();

      timers.start('test');

      setTimeout(() => {
        let output = timers.stop('test'),
            duration = timers.get('test');

        assert.ok(output.startsWith('2'));
        assert.notEqual(duration.start, duration.end);
        assert.ok(duration.end > duration.start);
        assert.equal(timers.diff('test'), duration.end - duration.start);
        assert.ok(timers.diff('test') >= 20);
        assert.equal(duration.start, parseInt(duration.start, 10));
        assert.equal(duration.end, parseInt(duration.end, 10));
        done();
      }, ms(20));
    });

    it('should not break if the end time does not exist', (done) => {
      let timers = new Timers(),
          start = Date.now();

      timers.start('test');

      setTimeout(() => {
        let output = timers.stop('blah'),
            duration = timers.get('blah');

        assert.equal(output, null);
        done();
      }, ms(20));
    });
  });
});