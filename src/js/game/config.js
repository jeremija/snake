/**
 * Main game configuration
 * @module game/config
 */
define([], function() {

    var exports = {
        /**
         * Zoom level. Determines how many pixels will a single point take.
         * @type {Number}
         */
        pixelMultiplier: 12,

        /**
         * Defines the keys used for navigating the snake
         * @typedef {Object} Keys
         * @property {Number} left   key code of the left key
         * @property {Number} up     key code of the up key
         * @property {Number} right  key code of the right key
         * @property {Number} down   key code of the down key
         * @property {Number} pause   key code of the pause key
         */

        /**
         * @type {Keys}
         */
        keys: {
            left: 37,
            up: 38,
            right: 39,
            down: 40,
            pause: 80
        },
        /**
         * Parameters for {@link game/Snake} constructor. The area params will
         * be used for both food and the snake.
         * @type {Object}
         */
        snakeParams: {
            position: {
                x: 10,
                y: 10
            },
            area: {
                x: 40,
                y: 30
            }
        },

        /**
         * Level configuration parameters
         * @typedef {Object} Level
         * @property {Number} interval        Default refresh interval for level
         * in milliseconds
         * @property {Number} intervalDivider Coefficient to divide the interval
         * with for the next level. Should be > 1
         * @property {Number} threshold       Defines after how many points to
         * advance to next level
         * @property {Number} startLevel      Defines the start level
         * @property {Number} startLength     Defines the initial snake length
         */

        /**
         * @type {Level}
         */
        level: {
            interval: 200,
            intervalDivider: 1.33,
            threshold: 5,
            startLevel: 1,
            startLength: 3
        }
    };

    return exports;
});