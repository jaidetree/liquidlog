import assert from 'assert';
import StdoutInterceptor from './lib/StdoutInterceptor';
import StartMessage from '../src/start_message';

describe('StartMessage', () => {
  describe('#constructor', () => {
    it('should create instances of action message', () => {
      let message = new StartMessage();
      assert.ok(message instanceof StartMessage);
    });

    it('should initialize properly', () => {
      let message = new StartMessage();
      assert.equal(message.type, 'start');
      assert.notEqual(message.message, undefined);
    });

    it('should have methods', () => {
      let methods = Object.getOwnPropertyNames(StartMessage.prototype.__proto__);
      assert.deepEqual(methods, ['constructor', 'action', 'data', 'hr', 'line', 'send', 'text', 'time', 'toString']);
    });
  });

  describe('#action()', () => {
    it('should append an action string', () => {
      let message = new StartMessage();
      message.action('Test');
      assert.equal(message.toString(), 'Test');
    });

    it('should be a chainable method', () => {
      let message = new StartMessage();
      message.action('Test').action('test');
      assert.equal(message.toString(), 'Test test');
    });
  });

  describe('#data()', () => {
    it('should append an data string', () => {
      let message = new StartMessage();
      message.data('Test');
      assert.equal(message.toString(), '\u001b[35mTest\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new StartMessage();
      message.data('Test').data('test');
      assert.equal(message.toString(), '\u001b[35mTest\u001b[39m \u001b[35mtest\u001b[39m');
    });
  });

  describe('#hr()', () => {
    it('should render a horizontal rule', () => {
      let message = new StartMessage();
      message.hr();
      assert.equal(message.toString(), '-'.repeat(process.stdout.columns - 11));
    });

    it('should accept a char param', () => {
      let message = new StartMessage();
      message.hr('=');
      assert.equal(message.toString(), '='.repeat(process.stdout.columns - 11));
    });

    it('should accept a count param', () => {
      let message = new StartMessage();
      message.hr('-', 40);
      assert.equal(message.toString(), '-'.repeat(40));
    });
  });

  describe('#line()', () => {
    it('should create a newline', () => {
      let message = new StartMessage();
      message.text('Hi').line();
      assert.equal(message.toString(), 'Hi \n');
    });

    it('should support the text param', () => {
      let message = new StartMessage();
      message.text('Hi').line('world');
      assert.equal(message.toString(), 'Hi \nworld');
    });
  });

  describe('#send()', () => {
    it('should write to stdout', () => {
      let message = new StartMessage(),
          ceptor = new StdoutInterceptor(),
          output;

      message.text('Hi there').data('friend');
      ceptor.capture();
      message.send();
      output = ceptor.release();
      assert.equal(output.slice(output.indexOf(' ') + 1), '» Hi there friend …');
    });
  });

  describe('#text()', () => {
    it('should append an data string', () => {
      let message = new StartMessage();
      message.text('Test');
      assert.equal(message.toString(), 'Test');
    });

    it('should be a chainable method', () => {
      let message = new StartMessage();
      message.text('Test').text('test');
      assert.equal(message.toString(), 'Test test');
    });
  });

  describe('#time()', () => {
    it('should append an data string', () => {
      let message = new StartMessage();
      message.time('5m');
      assert.equal(message.toString(), 'in \u001b[36m5m\u001b[39m');
    });

    it('should be a chainable method', () => {
      let message = new StartMessage();
      message.time('3m').time('27s');
      assert.equal(message.toString(), 'in \u001b[36m3m\u001b[39m in \u001b[36m27s\u001b[39m');
    });
  });

  describe('#toString()', () => {
    it('should produce a string', () => {
      let message = new StartMessage();
      message.text('Test').text('test');
      assert.equal(message.toString(), 'Test test');
    });
  });

});