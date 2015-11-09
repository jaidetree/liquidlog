import gutil from 'gulp-util';

let stdoutWrite = process.stdout._write;

/**
 * Stdout Interceptor
 * Allows us to temporarily prevent and capture output to the stdout console
 * which helps us test the console log.
 *
 * @class
 * @property {array} output - Collection of captured output
 */
export default class StdoutInterceptor {

  /**
   * Constructor
   * Initializes the class properties
   *
   * @constructor
   */
  constructor () {
    this.output = [];
  }

  /**
   * Capture
   * Overwrites node's write method on the stdout
   *
   * @method
   * @public
   */
  capture () {
    let output = this.output = [];

    process.stdout._write = (chunk, enc, callback) => {
      this.output.push(chunk);
      callback();
    };
  }

  /**
   * Release
   * Stop capturing the output
   * 
   * @method
   * @returns {string} A cleaned up colorless output
   */
  release () {
    process.stdout._write = stdoutWrite;
    return gutil.colors.stripColor(this.toString().trim());
  }

  /**
   * To String
   * Returns the concatenated output
   *
   * @method
   * @public
   * @returns {string} Captured output string
   */
  toString () {
    return this.output.join('');
  }
}