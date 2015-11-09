import gutil from 'gulp-util';

/**
 * Message
 */
export default class Message {
  /**
   * Constructor
   * Initializes the message class
   *
   * @constructor
   * @param {array} message - Array of messages
   */
  constructor(message) {
    this.message = Array.isArray(message) ? message : [];
  }

  /**
   * Length (getter)
   * Returns the # of message parts
   *
   * @property
   * @public
   * @returns {int} length of messages array
   */
  get length() {
    return this.message.length;
  }

  /**
   * Clone
   * Clones the messages
   *
   * @method
   * @public
   * @returns {Message} new message with a clone of the message array
   */
  clone() {
    return new Message(this.message.slice());
  }

  /**
   * Pop
   * Removes the last message part
   *
   * @method
   * @public
   * @returns {string} Last message string
   */
  pop() {
    return this.message.pop();
  }

  /**
   * Push
   * Combines the given args into a string and adds it to the message
   *
   * @method
   * @public
   * @param {...string} args - Sub message pieces to make up a single word
   * @returns {Message} chainable instance
   */
  push(...args) {
    let str = args.join('');
    this.message.push(str);
    return this;
  }

  /**
   * Send
   * Sends the message via gulp util log
   *
   * @method
   * @public
   */
  send() {
    return gutil.log(...this.message);
  }

  /**
   * Shift
   * Remove an item from the beginning of the message array
   *
   * @method
   * @public
   * @returns {string} first item removed from the array
   */
  shift() {
    return this.message.shift();
  }

  /**
   * To String
   * Formats the message as a string
   *
   * @method
   * @public
   * @returns {string} String format of the message separated into words.
   */
  toString() {
    return this.message.join(' ');
  }

  /**
   * Unshift
   * Combines the args into a single word then prepends it to the message
   *
   * @method
   * @public
   * @param {...string} args - Strings to combine into a word
   * @returns {Message} Chainable instance reference
   */
  unshift(...args) {
    let str = args.join('');
    this.message.unshift(str);
    return this;
  }
}

