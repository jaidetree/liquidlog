import Message from './message';
import {colors} from 'gulp-util';

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
export default class TaskMessage {
  /**
   * Constructor
   * Constructs the base TaskMessage class
   *
   * @constructor
   * @param {string} [plugin] An optional plugin string for organization
   */
  constructor(plugin) {
    this.message = new Message(); 
    this.type = 'text';

    // We have a plugin so lets create the message header.
    if (plugin) {
      this.plugin = plugin;
      this.message.push(
        colors.white('['),
        colors.cyan(plugin.toUpperCase()),
        colors.white(']:')
      );
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
  action(str) {
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
  data(str) {
    this.message.push(colors.magenta(str));
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
  hr(char='-', width=process.stdout.columns - 11) {
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
  line(str) {
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
  send() {
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
  text(str) {
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
  time(str) {
    this.message.push('in');
    this.message.push(colors.cyan(str));
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
  toString() {
    return this.message.toString();
  }
}
