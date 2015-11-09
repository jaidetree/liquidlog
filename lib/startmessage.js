'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _taskmessage = require('./taskmessage');

var _taskmessage2 = _interopRequireDefault(_taskmessage);

var _gulpUtil = require('gulp-util');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Start Message
 * A starting action message, more or less just appends ellipsis at the end.
 * 
 * @class
 * @extends {ActionMessage}
 * @property {Message} message - Instance to the message pieces
 * @property {string} type - Type of message this instance is
 * @property {string} plugin - Name of plugin log statement was called from
 * @property {string} icon - icon string to prepend when sending
 */

var StartMessage = (function (_TaskMessage) {
  _inherits(StartMessage, _TaskMessage);

  function StartMessage(plugin) {
    _classCallCheck(this, StartMessage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StartMessage).call(this, plugin));
    // Call the ActionMessage constructor

    _this.type = 'start';
    _this.icon = _gulpUtil.colors.green.bold('»');
    return _this;
  }

  /**
   * Send
   * Sends the message but this time it appends the ellipsis to the end
   *
   * @method
   * @public
   */

  _createClass(StartMessage, [{
    key: 'send',
    value: function send() {
      /** Makes sure the tail only gets added once to ensure reusability */
      if (this.message.last() !== '…') {
        this.message.push('…');
      }

      return _get(Object.getPrototypeOf(StartMessage.prototype), 'send', this).call(this);
    }
  }]);

  return StartMessage;
})(_taskmessage2.default);

exports.default = StartMessage;