import assert from 'assert';
import StdoutInterceptor from './lib/StdoutInterceptor';
import Message from '../src/message';

describe('Message', () => {
  describe('#constructor', () => {
    it('should create instances of messages', () => {
      let message = new Message();
      assert.ok(message instanceof Message);
    });

    it('should initialize messages as an empty array', () => {
      let message = new Message();
      assert.deepEqual(message.message, []);
    });

    it('should support non-empty array', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);
      assert.equal(message.length, parts.length);
    });

    it('should return an empty array if input not array', () => {
      let parts = 'garbage data',
          message = new Message(parts);
      assert.deepEqual(message.message, []);
    });
  });

  describe('#length', () => {
    it('should report accurate length', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      assert.equal(message.length, parts.length);
    });
  });

  describe('#clone()', () => {
    it('should produce a valid copy', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts),
          message2 = message.clone();

      assert.notEqual(message === message2, true, 'Message clone was an exact copy.');
      assert.equal(message.length, message2.length);
    });
  });

  describe('#last()', () => {
    it('should return the last item', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      assert.equal(message.last(), 'three');
    });
  });

  describe('#pop()', () => {
    it('should remove the last message part', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts),
          popped = message.pop();

      assert.equal(popped, 'three');
      assert.equal(message.length, 2);
    });
  });

  describe('#push()', () => {
    it('should add an item to the message array', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.push('four');

      assert.equal(message.length, 4);
      assert.equal(message.message[3], 'four');
    });

    it('should support multiple args', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.push('f', 'o', 'u', 'r');

      assert.equal(message.length, 4);
      assert.equal(message.message[3], 'four');
    });

    it('should be chainable', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.push('four').push('five');

      assert.equal(message.length, 5);
      assert.equal(message.message[3], 'four');
      assert.equal(message.message[4], 'five');
    });
  });

  describe('#send()', () => {
    it('should send the message to the console', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts),
          ceptor = new StdoutInterceptor(),
          output;

      ceptor.capture();
      message.send();
      output = ceptor.release();

      assert.equal(output.endsWith(message.toString()), true);
    });
  });

  describe('#shift()', () => {
    it('should remove the first item from the message array', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts),
          shifted = message.shift();

      assert.equal(shifted, 'one');
      assert.equal(message.length, 2);
    });
  });

  describe('#toString()', () => {
    it('should produce a string', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts),
          output = message.toString();

      assert.equal(output, 'one two three');
    });
  });

  describe('#unshift()', () => {
    it('should add an item to the beginning of the message array', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.unshift('four');

      assert.equal(message.length, 4);
      assert.equal(message.message[0], 'four');
    });

    it('should support multiple args', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.unshift('f', 'o', 'u', 'r');

      assert.equal(message.length, 4);
      assert.equal(message.message[0], 'four');
    });

    it('should be chainable', () => {
      let parts = ['one', 'two', 'three'],
          message = new Message(parts);

      message.unshift('four').unshift('five');

      assert.equal(message.length, 5);
      assert.equal(message.message[1], 'four');
      assert.equal(message.message[0], 'five');
    });
  });
});