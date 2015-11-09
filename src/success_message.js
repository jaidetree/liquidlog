'use strict';

import TaskMessage from './task_message';
import { colors } from 'gulp-util';

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
class SuccessMessage extends TaskMessage {
  constructor (plugin) {
    // Call the parent constructor with the plugin & set the icon
    super(plugin);
    this.icon = this.color('✓');
    this.type = 'success';
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
  action (str) {
    return super.action(this.color(str));
  }

  /**
   * Color
   * A method to remove any previously set colors and format it as green.
   *
   * @method
   * @public
   * @param {string} text - Text input
   * @returns {string} Green colored terminal text
   */
  color (text) {
    return colors.green.bold(colors.stripColor(text));
  }
}

export default SuccessMessage;
