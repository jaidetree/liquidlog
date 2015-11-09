'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _task_message = require('./task_message');

var _task_message2 = _interopRequireDefault(_task_message);

var _gulpUtil = require('gulp-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Action Message
 * An action message, used when a action has happened via gulp tasks.
 *
 * @class
 * @extends {TaskMessage}
 * @property {Message} message - Instance to the message pieces
 * @property {string} type - Type of message this instance is
 * @property {string} plugin - Name of plugin log statement was called from
 * @property {string} icon - icon string to prepend when sending
 */

var ActionMessage = (function (_TaskMessage) {
  _inherits(ActionMessage, _TaskMessage);

  /**
   * Constructor
   * Initializes the action message instance
   *
   * @constructor
   * @param {string} plugin - Name of the plugin calling log
   */

  function ActionMessage(plugin) {
    _classCallCheck(this, ActionMessage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ActionMessage).call(this, plugin));
    // Call the parent constructor with the plugin & set the icon

    _this.icon = _gulpUtil.colors.gray('•');
    _this.type = 'action';
    return _this;
  }

  return ActionMessage;
})(_task_message2.default);

exports.default = ActionMessage;