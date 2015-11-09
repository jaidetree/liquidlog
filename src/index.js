import Message from './message';
import TaskMessage from './taskmessage';
import ActionMessage from './actionmessage';
import StartMessage from './startmessage';
import ErrorMessage from './errormessage';
import SuccessMessage from './successmessage';

let gutil = require('gulp-util'),
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
export class Logger {
  /**
   * Action
   * A method to create an action message
   *
   * @method
   * @public
   * @param {string} plugin - Name of the plugin calling this log method
   * @returns {TaskMessage} A TaskMessage subclass
   */
  action(...args) {
    return this.buildMessage(ActionMessage, ...args);
  }

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
  buildMessage(cls, ...args) {
    let message = new cls(args[0]);

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
    if (cls === TaskMessage) {
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
  error(...args) {
    return this.buildMessage(ErrorMessage, ...args);
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
  start(...args) {
    return this.buildMessage(StartMessage, ...args);
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
  success(...args) {
    return this.buildMessage(SuccessMessage, ...args);
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
  text(...args) {
    return this.buildMessage(TaskMessage, null, ...args);
  }
}

export default new Logger();