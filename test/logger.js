/* global describe, it */

import assert from 'assert';
import StdoutInterceptor from './lib/stdout_interceptor';
import { Logger } from '../src/';

function clean (str) {
  var s = str.toString().trim();
  return s.slice(s.indexOf(' ') + 1);
}

describe('Logger', () => {
  describe('#constructor', () => {
    it('should produce an instance of Logger', () => {
      let logger = new Logger();
      assert.ok(logger instanceof Logger);
    });
  });

  describe('#error', () => {
    it('should build an error message', () => {
      let logger = new Logger(),
          message = logger.error();

      message.text('Hello world');

      assert.equal(message.type, 'error');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mHello world\u001b[22m\u001b[39m');
    });

    it('should support sending immediately', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.error('test', 'Testing logger library');
      output = ceptor.release();

      assert.equal(clean(output), '⨉ [TEST]: ERROR: Testing logger library');
    });

    it('should support colored formatting', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;

      ceptor.capture();
      logger.error('test')
        .action('Tested')
        .data('this')
        .send();

      ceptor.release();
      output = ceptor.toString();

      assert.equal(clean(output), '\u001b[31m\u001b[1m⨉\u001b[22m\u001b[39m \u001b[37m[\u001b[39m\u001b[36mTEST\u001b[39m\u001b[37m]:\u001b[39m \u001b[31m\u001b[1mERROR: Tested\u001b[22m\u001b[39m \u001b[35mthis\u001b[39m');
    });
  });

  describe('#start', () => {
    it('should build a start message', () => {
      let logger = new Logger(),
          message = logger.start();

      message.text('Hello world');

      assert.equal(message.type, 'start');
      assert.equal(message.toString(), 'Hello world');
    });

    it('should support sending immediately', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.start('test', 'Testing logger library');
      output = ceptor.release();

      assert.equal(clean(output), '» [TEST]: Testing logger library …');
    });

    it('should support colored formatting', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.start('test')
        .action('Tested')
        .data('this')
        .send();

      ceptor.release();
      output = ceptor.toString();

      assert.equal(clean(output), '\u001b[32m\u001b[1m»\u001b[22m\u001b[39m \u001b[37m[\u001b[39m\u001b[36mTEST\u001b[39m\u001b[37m]:\u001b[39m Tested \u001b[35mthis\u001b[39m …');
    });
  });

  describe('#success', () => {
    it('should build a success message', () => {
      let logger = new Logger(),
          message = logger.success();

      message.text('Hello world');

      assert.equal(message.type, 'success');
      assert.equal(message.toString(), 'Hello world');
    });

    it('should support sending immediately', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.success('test', 'Testing logger library');
      output = ceptor.release();

      assert.equal(clean(output), '✓ [TEST]: Testing logger library');
    });

    it('should support colored formatting', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.success('test')
        .action('Tested')
        .data('this')
        .send();
      ceptor.release();

      output = ceptor.toString();

      assert.equal(clean(output), '\u001b[32m\u001b[1m✓\u001b[22m\u001b[39m \u001b[37m[\u001b[39m\u001b[36mTEST\u001b[39m\u001b[37m]:\u001b[39m \u001b[32m\u001b[1mTested\u001b[22m\u001b[39m \u001b[35mthis\u001b[39m');
    });
  });

  describe('#task', () => {
    it('should build an action message', () => {
      let logger = new Logger(),
          message = logger.task();

      message.text('Hello world');

      assert.equal(message.type, 'action');
      assert.equal(message.toString(), 'Hello world');
    });

    it('should support sending immediately', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.task('test', 'Testing logger library');
      output = ceptor.release();

      assert.equal(clean(output), '• [TEST]: Testing logger library');
    });

    it('should support colored formatting', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;


      ceptor.capture();
      logger.task('test')
        .action('Tested')
        .data('this library')
        .text('again')
        .send();
      ceptor.release();

      output = ceptor.toString();

      assert.equal(clean(output), '\u001b[90m•\u001b[39m \u001b[37m[\u001b[39m\u001b[36mTEST\u001b[39m\u001b[37m]:\u001b[39m Tested \u001b[35mthis library\u001b[39m again');
    });
  });

  describe('#text', () => {
    it('should build a text message', () => {
      let logger = new Logger(),
          message = logger.text();

      message.text('Hello world');

      assert.equal(message.type, 'text');
      assert.equal(message.toString(), 'Hello world');
    });

    it('should support sending immediately', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;

      ceptor.capture();
      logger.text('test', 'Testing logger library');
      output = ceptor.release();

      assert.equal(clean(output), 'test Testing logger library');
    });

    it('should support colored formatting', () => {
      let logger = new Logger(),
          ceptor = new StdoutInterceptor(),
          output;

      ceptor.capture();
      logger.text()
        .action('Tested')
        .data('this')
        .send();
      ceptor.release();

      output = ceptor.toString();

      assert.equal(clean(output), 'Tested \u001b[35mthis\u001b[39m');
    });
  });
});
