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
 * Success Message
 * An error message triggered from a gulp task. Formats the actions as green.
 * 
 * @class
 * @extends {TaskMessage}
 * @property {Message} message - Instance to the message pieces
 * @property {string} type - Type of message this instance is
 * @property {string} plugin - Name of plugin log statement was called from
 * @property {string} icon - icon string to prepend when sending
 */

var SuccessMessage = (function (_TaskMessage) {
  _inherits(SuccessMessage, _TaskMessage);

  function SuccessMessage(plugin) {
    _classCallCheck(this, SuccessMessage);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SuccessMessage).call(this, plugin));
    // Call the parent constructor with the plugin & set the icon

    _this.icon = _this.color('✓');
    _this.type = 'success';
    return _this;
  }

  /**
   * Action
   * Formats the action string green by calling the parent method with
   * a green formatted string.
   *
   * @method
   * @public
   * @param {string} str - Successful action string to show
   * @returns {ErorMessage} Chainable instance ref to this
   */

  _createClass(SuccessMessage, [{
    key: 'action',
    value: function action(str) {
      return _get(Object.getPrototypeOf(SuccessMessage.prototype), 'action', this).call(this, this.color(str));
    }

    /**
     * Color
     * A method to remove any previously set colors and format it as green.
     *
     * @method
     * @public
     * @param {string} str - Text input 
     * @returns {string} Green colored terminal text
     */

  }, {
    key: 'color',
    value: function color(text) {
      return _gulpUtil.colors.green.bold(_gulpUtil.colors.stripColor(text));
    }
  }]);

  return SuccessMessage;
})(_taskmessage2.default);

exports.default = SuccessMessage;