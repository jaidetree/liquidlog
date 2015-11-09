'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Message
 */

var Message = (function () {
  /**
   * Constructor
   * Initializes the message class
   *
   * @constructor
   * @param {array} message - Array of messages
   */

  function Message(message) {
    _classCallCheck(this, Message);

    this.message = Array.isArray(message) ? message : [];
  }

  /**
   * Length (getter)
   * Returns the # of message parts
   *
   * @method
   * @public
   * @returns {int} length of messages array
   */

  _createClass(Message, [{
    key: 'clone',

    /**
     * Clone
     * Clones the messages
     *
     * @method
     * @public
     * @returns {Message} new message with a clone of the message array
     */
    value: function clone() {
      return new Message(this.message.slice());
    }

    /**
     * Last
     * Returns the last message part
     *
     * @method
     * @public
     * @returns {string} Last message part
     */

  }, {
    key: 'last',
    value: function last() {
      return this.message[this.message.length - 1];
    }

    /**
     * Pop
     * Removes the last message part
     *
     * @method
     * @public
     * @returns {string} Last message string
     */

  }, {
    key: 'pop',
    value: function pop() {
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

  }, {
    key: 'push',
    value: function push() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var str = args.join('');
      this.message.push(str);
      return this;
    }

    /**
     * Send
     * Sends the message via gulp util log
     *
     * @method
     * @public
     * @returns {Message} chainable instance
     */

  }, {
    key: 'send',
    value: function send() {
      _gulpUtil2.default.log(this.toString());
      return this;
    }

    /**
     * Shift
     * Remove an item from the beginning of the message array
     *
     * @method
     * @public
     * @returns {string} first item removed from the array
     */

  }, {
    key: 'shift',
    value: function shift() {
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

  }, {
    key: 'toString',
    value: function toString() {
      return this.message.join(' ').replace(/\n /g, '\n');
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

  }, {
    key: 'unshift',
    value: function unshift() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var str = args.join('');
      this.message.unshift(str);
      return this;
    }
  }, {
    key: 'length',
    get: function get() {
      return this.message.length;
    }
  }]);

  return Message;
})();

exports.default = Message;