import ActionMessage from './actionmessage';
import {colors} from 'gulp-util';

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
export default class StartMessage extends ActionMessage {
  constructor(plugin) {
    // Call the ActionMessage constructor
    super(plugin);
    this.type = 'start';
  }

  /**
   * Send
   * Sends the message but this time it appends the ellipsis to the end
   *
   * @method
   * @public
   */
  send() {
    this.message.push('…');
    return super.send();
  }
}

