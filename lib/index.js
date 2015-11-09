'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = undefined;

var _message = require('./message');

var _message2 = _interopRequireDefault(_message);

var _taskmessage = require('./taskmessage');

var _taskmessage2 = _interopRequireDefault(_taskmessage);

var _actionmessage = require('./actionmessage');

var _actionmessage2 = _interopRequireDefault(_actionmessage);

var _startmessage = require('./startmessage');

var _startmessage2 = _interopRequireDefault(_startmessage);

var _errormessage = require('./errormessage');

var _errormessage2 = _interopRequireDefault(_errormessage);

var _successmessage = require('./successmessage');

var _successmessage2 = _interopRequireDefault(_successmessage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var gutil = require('gulp-util'),
    colors = gutil.colors;

/**
 * Log
 * Simple library for logging events throughout the page
 *
 * @example
 *   log.success('clean')
 *    .action('Cleaned')
 *    .data(dir)
 *    .action('directory')
 *    .send();
 *
 *  log.success('lint', 'Linted', dir);
 *  log.error('clean', 'Some shit happened', '<<shit>>');
 *  log.start('clean', 'Getting hungry for', 'FOOD');
 *  log.action('clean', 'Listening to', 'Mastodon');
 *  log.text().hr().send();
 *  log.text('Sending a basic', 'message');
 */

/**
 * Logger
 * A simple class to contain the accessible public methods to build the
 * message objects
 *
 * @class
 */

var Logger = exports.Logger = (function () {
  function Logger() {
    _classCallCheck(this, Logger);
  }

  _createClass(Logger, [{
    key: 'buildMessage',

    /**
     * Build Message
     * Creates an instance of the message type. If we are given a bunch of
     * arguments then we assume the user just wants to send it. Otherwise
     * we return the chainable interface.
     *
     * @method
     * @public
     * @param {TaskMessage} cls - A TaskMessage subclass
     * @param {...string} args - The plugin string if chainable interface
     *                           or a lot more if just a one off message
     */
    value: function buildMessage(cls) {
      for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }

      var message = new cls(args[0]);

      /** 
       * If we only have one argument it's the plugin so lets return the
       * chainable interface.
       */
      if (args.length <= 1) {
        return message;
      }

      /**
       * If just a simple task message just format the main string as text
       * otherwise assume it's an action
       */
      if (cls === _taskmessage2.default) {
        message.text(args[1]);
      } else {
        message.action(args[1]);
      }

      /**
       * If we have another argument it is probably data
       */
      if (args.length >= 3) {
        message.data(args[2]);
      }

      /**
       * The last argument is a time attribute
       */
      if (args.length >= 4) {
        message.time(args[3]);
      }

      /**
       * Since we have been given a lot of args lets assume it's a one-off
       * and send it right here and now.
       */
      return message.send();
    }

    /**
     * Error
     * A method to create an error message
     *
     * @method
     * @public
     * @param {string} plugin - Name of the plugin calling this log method
     * @returns {TaskMessage} A TaskMessage subclass
     */

  }, {
    key: 'error',
    value: function error() {
      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return this.buildMessage.apply(this, [_errormessage2.default].concat(args));
    }

    /**
     * Start
     * A method to create a starting action message
     *
     * @method
     * @public
     * @param {string} plugin - Name of the plugin calling this log method
     * @returns {TaskMessage} A TaskMessage subclass
     */

  }, {
    key: 'start',
    value: function start() {
      for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return this.buildMessage.apply(this, [_startmessage2.default].concat(args));
    }

    /**
     * Success
     * A method to create a success message
     *
     * @method
     * @public
     * @param {string} plugin - Name of the plugin calling this log method
     * @returns {TaskMessage} A TaskMessage subclass
     */

  }, {
    key: 'success',
    value: function success() {
      for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return this.buildMessage.apply(this, [_successmessage2.default].concat(args));
    }

    /**
     * Task
     * A method to create an task message
     *
     * @method
     * @public
     * @param {string} plugin - Name of the plugin calling this log method
     * @returns {TaskMessage} A TaskMessage subclass
     */

  }, {
    key: 'task',
    value: function task() {
      for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
        args[_key5] = arguments[_key5];
      }

      return this.buildMessage.apply(this, [_actionmessage2.default].concat(args));
    }

    /**
     * Text
     * A method to create a basic text message
     *
     * @method
     * @public
     * @param {string} plugin - Name of the plugin calling this log method
     * @returns {TaskMessage} A TaskMessage subclass
     */

  }, {
    key: 'text',
    value: function text() {
      for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
        args[_key6] = arguments[_key6];
      }

      return this.buildMessage.apply(this, [_taskmessage2.default, null].concat(args));
    }
  }]);

  return Logger;
})();

exports.default = new Logger();