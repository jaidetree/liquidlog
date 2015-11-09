'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _gulpUtil = require('gulp-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Task Message
 * A gulp-centric log statement that is chainable and easily customizable
 * 
 * @class
 * @property {Message} message - Instance to the message pieces
 * @property {string} type - Type of message this instance is
 * @property {string} plugin - Name of plugin log statement was called from
 * @property {string} [icon] - Optional icon string to prepend when sending
 */

var TaskMessage = (function () {
  /**
   * Constructor
   * Constructs the base TaskMessage class
   *
   * @constructor
   * @param {string} [plugin] An optional plugin string for organization
   */

  function TaskMessage(plugin) {
    _classCallCheck(this, TaskMessage);

    this.message = new _message2.default();
    this.type = 'text';

    // We have a plugin so lets create the message header.
    if (plugin) {
      this.plugin = plugin;
      this.message.push(_gulpUtil.colors.white('['), _gulpUtil.colors.cyan(plugin.toUpperCase()), _gulpUtil.colors.white(']:'));
    }
  }

  /**
   * Action
   * Add an action formatted string -- more useful in other contexts
   *
   * @method
   * @public
   * @param {string} str - The message string to format and add to the message
   * @returns {TaskMessage} Chainable instance reference
   */

  _createClass(TaskMessage, [{
    key: 'action',
    value: function action(str) {
      this.message.push(str);
      return this;
    }

    /**
     * Data
     * Add a data formatted string
     *
     * @method
     * @public
     * @param {string} str - The message string to format and add to the message
     * @returns {TaskMessage} Chainable instance reference
     */

  }, {
    key: 'data',
    value: function data(str) {
      this.message.push(_gulpUtil.colors.magenta(str));
      return this;
    }

    /**
     * HR
     * Adds a textual horizontal rule with the given char x amount of columns
     *
     * @method
     * @public
     * @param {string} [char="-" - The character to use to render the rule
     * @param {int} [width=MAX_COLUMNS] - Maximum number of columns in terminal
     */

  }, {
    key: 'hr',
    value: function hr() {
      var char = arguments.length <= 0 || arguments[0] === undefined ? '-' : arguments[0];
      var width = arguments.length <= 1 || arguments[1] === undefined ? process.stdout.columns - 11 : arguments[1];

      this.message.push(char.repeat(width));
      return this;
    }

    /**
     * Line
     * Adds a linebreak followed by a new text string if supplied.
     *
     * @method
     * @public
     * @param {string} str - Optional text to append after linebreak
     */

  }, {
    key: 'line',
    value: function line(str) {
      this.message.push('\n');
      if (str) {
        this.text(str);
      }

      return this;
    }

    /**
     * Send
     * Sends the message
     *
     * @method
     * @public
     */

  }, {
    key: 'send',
    value: function send() {
      // If we have an icon put it at the beginning of the message
      if (this.icon) {
        this.message.unshift(this.icon);
      }

      return this.message.send();
    }

    /**
     * Text
     * Add regular text to the message
     *
     * @method
     * @public
     * @param {string} str - The message string to format and add to the message
     * @returns {TaskMessage} Chainable instance reference
     */

  }, {
    key: 'text',
    value: function text(str) {
      this.message.push(str);
      return this;
    }

    /**
     * Time
     * Add a time formatted string
     *
     * @method
     * @public
     * @param {string} str - The message string to format and add to the message
     * @returns {TaskMessage} Chainable instance reference
     */

  }, {
    key: 'time',
    value: function time(str) {
      this.message.push('in');
      this.message.push(_gulpUtil.colors.cyan(str));
      return this;
    }

    /**
     * To String
     * Returns a string version of the message
     *
     * @method
     * @public
     * @returns {string} The message in string form
     */

  }, {
    key: 'toString',
    value: function toString() {
      return this.message.toString();
    }
  }]);

  return TaskMessage;
})();

exports.default = TaskMessage;