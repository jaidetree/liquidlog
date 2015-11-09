'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SECONDS = 1000;
var MINUTES = SECONDS * 60;
var HOURS = MINUTES * 60;
var DAYS = HOURS * 24;
var MONTHS = DAYS * 30;
var YEARS = DAYS * 365;

/**
 * Timers
 * A a class that tracks timers and uses moment to calculate the elapsed time
 * between.
 *
 * @class
 * @property {array} durations - Collection of durations
 * @property {object} index - Quick index to quickly refer to timers.
 */

var Timers = (function () {
  /**
   * Constructor
   * Initializes the timers class
   *
   * @constructor
   */

  function Timers() {
    _classCallCheck(this, Timers);

    this.durations = [];
    this.index = {};
  }

  /**
   * Diff
   * Returns the difference between the start and end of a diff 
   *
   * @method
   * @public
   * @param {object|string} data - Either duration object or timer name
   * @returns {int} Difference between start and end time in ms
   */

  _createClass(Timers, [{
    key: 'diff',
    value: function diff(data) {
      /** We were given a name instead of a duration */
      if (typeof data === 'string') {
        data = this.get(data);
      }

      return data.end - data.start;
    }

    /**
     * Elapsed
     * Retrieve the elapsed time between starting and stopping a timer.
     *
     * @method
     * @public
     * @param {object} data - Duration to return the elapsed time of
     * @returns {string} Elapsed time formatted as a string
     */

  }, {
    key: 'elapsed',
    value: function elapsed(data) {
      var elapsed = '',
          duration = '',
          concat = function concat() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return elapsed += ' ' + args.join('');
      },
          skipDays = false,
          skipMs = false,
          diff = undefined;

      /** We were given a name instead of a duration */
      if (typeof data === 'string') {
        data = this.get(data);
      }

      /** Easy enough */
      diff = this.diff(data);

      /** Create a moment duration */
      duration = _moment2.default.duration(diff);

      /** If it took years to run you might want to consider some changes */
      if (diff > YEARS) {
        concat(duration.years(), 'y');
      }

      /** It took months so lets add that string */
      if (diff > MONTHS) {
        concat(duration.months(), 'm');
        /** Determine if it's an even # of months, if so don't worry about days */
        if (Math.floor(duration.asMonths()) === duration.asMonths()) {
          skipDays = true;
        }
      }

      /** If the difference is more than a day */
      if (diff >= DAYS && !skipDays && duration.get('days') > 0) {
        concat(duration.days(), 'd');
      }

      /** If the difference is more than an hour */
      if (diff >= HOURS && duration.get('hours') > 0) {
        concat(duration.hours(), 'h');
      }

      /** If the difference is more than minutes */
      if (diff >= MINUTES) {
        concat(duration.minutes(), 'min');
      }

      /** IF the difference is more than a second */
      if (diff >= SECONDS && duration.get('seconds') > 0) {
        concat(duration.seconds(), 's');
      }

      /** Finally show the # of ms if not 0 */
      if (duration.get('milliseconds') > 0) {
        concat(Number(duration.get('milliseconds')), 'ms');
      }

      /** A nice pretty string to use */
      return elapsed.trim();
    }

    /**
     * Get
     * Retrieves the duration by name
     *
     * @method
     * @public
     * @param {string} name - Name of the timer to retrieve
     * @returns {object} The target duration object
     */

  }, {
    key: 'get',
    value: function get(name) {
      try {
        return this.durations[this.index[name]];
      } catch (e) {
        throw new Error('Could not find timer by the name of ' + name);
      }
    }

    /**
     * Start
     * Creates a new timer
     *
     * @method
     * @public
     * @param {string} name - Name of the timer starting
     * @returns {int} Start time in miliseconds since unix epoch
     */

  }, {
    key: 'start',
    value: function start(name) {
      var start = Date.now();

      if (!name) {
        name = this.durations.length;
      }

      /** Create our duration and update the index */
      this.durations.push({
        name: name,
        start: start,
        end: null
      });

      this.index[name] = this.durations.length - 1;

      return start;
    }

    /**
     * Stop
     * Stops a timer well at least in the terms of the interface really we
     * just track when this was called to calculate the diff.
     *
     * @method
     * @public
     * @param {string} name - Name of the timer
     * @returns {string} Result of this.elapsed(name)
     */

  }, {
    key: 'stop',
    value: function stop(name) {
      var duration = undefined;

      if (!name) {
        name = this.durations.length - 1;
      }

      /** Get the current duration for this name */
      duration = this.get(name);

      /** Record the end time of this timer in ms */
      duration.end = Date.now();

      /** Returned the elapsed time in a cute stringj */
      return this.elapsed(duration);
    }
  }]);

  return Timers;
})();

exports.default = Timers;
;