import TaskMessage from './taskmessage';
import {colors} from 'gulp-util';

/**
 * Error Message
 * An error message triggered from a gulp task. Just formats most things red.
 * 
 * @class
 * @extends {TaskMessage}
 * @property {Message} message - Instance to the message pieces
 * @property {string} type - Type of message this instance is
 * @property {string} plugin - Name of plugin log statement was called from
 * @property {string} icon - icon string to prepend when sending
 */
export default class ErrorMessage extends TaskMessage {
  constructor(plugin) {
    // Call the parent constructor with the plugin & set the icon
    super(plugin);
    this.icon = this.color('⨉');
    this.type = 'error';
  }

  /**
   * Action
   * Formats the action string red by calling the parent method with
   * a red formatted string.
   *
   * @method
   * @public
   * @param {string} str - Error string to show
   * @returns {ErorMessage} Chainable instance ref to this
   */
  action(str) {
    return super.action(this.color('ERROR: ' + str));
  }

  /**
   * Color
   * A method to remove any previously set colors and format it as red.
   *
   * @method
   * @public
   * @param {string} str - Text input 
   * @returns {string} Red colored terminal text
   */
  color(str) {
    return colors.red.bold(colors.stripColor(str));
  }

  /**
   * Text
   * Formats a basic text string red by calling the parent method with
   * a red formatted string.
   *
   * @method
   * @public
   * @param {string} str - Error string to show
   * @returns {ErorMessage} Chainable instance ref to this
   */
  text(str) {
    return super.text(this.color(str));
  }
}

