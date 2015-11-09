import assert from 'assert';
import StdoutInterceptor from './lib/StdoutInterceptor';
import ErrorMessage from '../src/error_message';

describe('ErrorMessage', () => {
  describe('#constructor', () => {
    it('should create instances of action message', () => {
      let message = new ErrorMessage();
      assert.ok(message instanceof ErrorMessage);
    });

    it('should initialize properly', () => {
      let message = new ErrorMessage();
      assert.equal(message.type, 'error');
      assert.notEqual(message.message, undefined);
    });

    it('should have methods', () => {
      let methods = Object.getOwnPropertyNames(ErrorMessage.prototype.__proto__);
      assert.deepEqual(methods, ['constructor', 'action', 'data', 'hr', 'line', 'send', 'text', 'time', 'toString']);
    });
  });

  describe('#action()', () => {
    it('should append an action string', () => {
      let message = new ErrorMessage();
      message.action('Test');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mERROR: Test\u001b[22m\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new ErrorMessage();
      message.action('Test').action('test');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mERROR: Test\u001b[22m\u001b[39m \u001b[31m\u001b[1mERROR: test\u001b[22m\u001b[39m');
    });
  });

  describe('#data()', () => {
    it('should append an data string', () => {
      let message = new ErrorMessage();
      message.data('Test');
      assert.equal(message.toString(), '\u001b[35mTest\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new ErrorMessage();
      message.data('Test').data('test');
      assert.equal(message.toString(), '\u001b[35mTest\u001b[39m \u001b[35mtest\u001b[39m');
    });
  });

  describe('#hr()', () => {
    it('should render a horizontal rule', () => {
      let message = new ErrorMessage();
      message.hr();
      assert.equal(message.toString(), '-'.repeat(process.stdout.columns - 11));
    });

    it('should accept a char param', () => {
      let message = new ErrorMessage();
      message.hr('=');
      assert.equal(message.toString(), '='.repeat(process.stdout.columns - 11));
    });

    it('should accept a count param', () => {
      let message = new ErrorMessage();
      message.hr('-', 40);
      assert.equal(message.toString(), '-'.repeat(40));
    });
  });

  describe('#line()', () => {
    it('should create a newline', () => {
      let message = new ErrorMessage();
      message.text('Hi').line();
      assert.equal(message.toString(), '\u001b[31m\u001b[1mHi\u001b[22m\u001b[39m \n');
    });

    it('should support the text param', () => {
      let message = new ErrorMessage();
      message.text('Hi').line('world');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mHi\u001b[22m\u001b[39m \n\u001b[31m\u001b[1mworld\u001b[22m\u001b[39m');
    });
  });

  describe('#send()', () => {
    it('should write to stdout', () => {
      let message = new ErrorMessage(),
          ceptor = new StdoutInterceptor(),
          output;

      message.text('Hi there').data('friend');
      ceptor.capture();
      message.send();
      output = ceptor.release();
      assert.equal(output.slice(output.indexOf(' ') + 1), '⨉ Hi there friend');
    });
  });

  describe('#text()', () => {
    it('should append an data string', () => {
      let message = new ErrorMessage();
      message.text('Test');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mTest\u001b[22m\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new ErrorMessage();
      message.text('Test').text('test');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mTest\u001b[22m\u001b[39m \u001b[31m\u001b[1mtest\u001b[22m\u001b[39m');
    });
  });

  describe('#time()', () => {
    it('should append an data string', () => {
      let message = new ErrorMessage();
      message.time('5m');
      assert.equal(message.toString(), 'in \u001b[36m5m\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new ErrorMessage();
      message.time('3m').time('27s');
      assert.equal(message.toString(), 'in \u001b[36m3m\u001b[39m in \u001b[36m27s\u001b[39m');
    });
  });

  describe('#toString()', () => {
    it('should produce a string', () => {
      let message = new ErrorMessage();
      message.text('Test').text('test');
      assert.equal(message.toString(), '\u001b[31m\u001b[1mTest\u001b[22m\u001b[39m \u001b[31m\u001b[1mtest\u001b[22m\u001b[39m');
    });
  });

});