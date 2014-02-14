/**
 * Main game configuration
 * @module game/config
 */
define([], function() {

    var exports = {
        pixelMultiplier: 12,
        /**
         * Defines the keys used for navigating the snake
         * @type {Object}
         */
        keys: {
            /**
             * @type {Number}
             */
            left: 37,
            /**
             * @type {Number}
             */
            up: 38,
            /**
             * @type {Number}
             */
            right: 39,
            /**
             * @type {Number}
             */
            down: 40
        },
        snakeParams: {
            /**
             * Initial position of the snake
             * @type {Object}
             */
            position: {
                /**
                 * @type {Number}
                 */
                x: 10,
                /**
                 * @type {Number}
                 */
                y: 10
            },
            /**
             * Game area
             * @type {Object}
             */
            area: {
                /**
                 * @type {Number}
                 */
                x: 40,
                /**
                 * @type {Number}
                 */
                y: 30
            }
        },
        level: {
            /**
             * Default refresh interval for level 1 in milliseconds
             * @type {Number}
             */
            interval: 200,
            /**
             * Coefficient to divide the interval with to get the interval for
             * the next level
             * @type {Number}
             */
            intervalDivider: 1.33,
            /**
             * Defines how many points are per level
             * @type {Number}
             */
            threshold: 5,
            startLevel: 1,
            startLength: 3
        }
    };

    return exports;
});