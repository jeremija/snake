define(['Extendable', 'game/Coordinates', 'knockout'],
    function(Extendable, Coordinates, ko) {

    /**
     * A string with possible values: 'left', 'right', 'up' or 'down'.
     * @typedef {String} Direction
     */

    /**
     * @class A class representing the snake.
     * @name game/Snake
     * @param {Object} params               configuration object
     * @param {Coords} params.position      initial position
     * @param {Coords} params.area          available area to move
     */
    function Snake(params) {
        /**
         * @type {Array.<game/Coordinates>}
         */
        var parts = [new Coordinates(params.position.x, params.position.y)];
        /**
         * @type {external:ko/observableArray}
         */
        this.parts = ko.observableArray(parts);

        /**
         * The available area in which the snake can freely move
         * @type {Coordinates}
         */
        this.area = new Coordinates(params.area.x, params.area.y);

        /**
         * @type {Direction}
         */
        this.lastDirection = undefined;
        /**
         * @type {Array.<Direction>}
         */
        this.directionsQueue = [];
        /**
         * True if the snake has crashed
         * @type {Boolean}
         */
        this.crashed = false;
    }

    var SnakePrototype = /** @lends game/Snake.prototype */ {
        /**
         * Map of directions which will be ignored if called immediately after
         * the previous direction. For example if the last direction was 'left'
         * and the player want's to go 'right', it will be ignored because
         * the snake can only make turns in -90 and +90 degrees.
         * @type {Object}
         */
        _oppositeDirections: {
            'left': 'right',
            'up': 'down',
            'right': 'left',
            'down': 'up'
        },
        /**
         * Check if the move to the specific coordinates will make the snake
         * crash.
         * @param  {Number} x  Absolute x coordinate value
         * @param  {Number} y  Absolute y coordinate value
         * @return {Boolean} true if the snake will crash, false otherwise.
         */
        willCrash: function(x, y) {
            if (x < 0 || y < 0) {
                return true;
            }
            if (x >= this.area.x() || y >= this.area.y()) {
                return true;
            }
            if (this.contains(x, y)) {
                return true;
            }
            return false;
        },

        up: function() {
            if (this.lastDirection === 'down') {
                return true;
            }

            this.lastDirection = 'up';
            return this.move(0, 1);
        },
        down: function() {
            if (this.lastDirection === 'up') {
                return true;
            }

            this.lastDirection = 'down';
            return this.move(0, -1);
        },
        left: function() {
            if (this.lastDirection === 'right') {
                return true;
            }

            this.lastDirection = 'left';
            return this.move(-1, 0);
        },
        right: function() {
            if (this.lastDirection === 'left') {
                return true;
            }

            this.lastDirection = 'right';
            return this.move(1, 0);
        },
        /**
         * Moves the last snake part to the specified coordinates. Only
         * either deltaX or deltaY may be defined.
         * @param  {Number} deltaX   May be 1, 0 or -1
         * @param  {Number} deltaY   May be 1, 0 or -1
         * @return {Boolean} true if the snake part was moved, false if crashed.
         */
        move: function(deltaX, deltaY) {
            if (this.crashed) {
                // throw new Error('already crashed!');
                return false;
            }

            var total = Math.abs(deltaX) + Math.abs(deltaY);

            if (total > 1 || total < 1) {
                throw new Error('can only move by one point - increase ' +
                    'either x or y by one point only');
            }

            var head = this.getHead();

            var x = head.x() + deltaX;
            var y = head.y() + deltaY;

            if (this.willCrash(x, y)) {
                this.crashed = true;
                return false;
                // throw new Error('crashed!');
            }

            var tail = this.parts.pop();
            tail.reset(x, y);
            this.parts.unshift(tail);

            return true;
        },
        /**
         * Finds the first snake part. The head part will change on each move
         * because the snake movement is achieved in a way that the last part
         * is moved to the first place.
         * @return {game/Coordinates}
         */
        getHead: function() {
            return this.parts()[0];
        },
        /**
         * Finds the last snake part. The tail part will change on each move
         * because the snake movement is achieved in a way that the last part
         * is moved to the first place.
         * @return {game/Coordinates}
         */
        getTail: function() {
            var parts = this.parts();
            return parts[parts.length - 1];
        },
        append: function() {
            var tail = this.getTail().duplicate();
            this.parts.push(tail);
        },
        /**
         * @param  {Number} x
         * @param  {Number} y
         * @return {Boolean} true if the coordinates x and y match one of the
         * snake's parts.
         */
        contains: function(x, y) {
            var parts = this.parts();
            return parts.some(function(coords) {
                if (coords.x() === x && coords.y() === y) {
                    return true;
                }
                return false;
            });
        },
        /**
         * Sets the direction before the next move. This is final for the next
         * move - user won't be able to change his mind. The subsequent  calls
         * won't do anything until the {@link game/Snake#go} method is called.
         * @param {Direction} direction
         */
        setNextDirection: function(direction) {
            var lastDirection =
                // get the direction from the end of the queue
                this.directionsQueue[this.directionsQueue.length - 1] ||
                // or the last direction in which the snake moved
                this.lastDirection;

            var oppositeDirection = this._oppositeDirections[lastDirection];

            if (oppositeDirection === direction) {
                // do not push opposite directions to the queue
                return;
            }

            if (lastDirection === direction) {
                // do not push the same direction to the queue
                return;
            }

            this.directionsQueue.push(direction);
        },
        /**
         * Calculates the direction in which the snake will move. This also
         * pops the next direction from the directionsQueue if it is not empty.
         * @return {Direction}
         */
        _getDirection: function() {
            // next direction or last direction
            return this.directionsQueue.shift() || this.lastDirection;
        },
        /**
         * Moves the snake in a previous direction or in the next direction set
         * by {@link game/Snake#setNextDirection}. Will not move the snake if
         * no direction was ever set.
         * @return {Boolean} true if the snake has been moved successfully,
         * false if the snake has crashed.
         */
        go: function() {
            var direction = this._getDirection();
            if (!direction) {
                return true;
            }
            return this[direction]();
        }
    };

    return Extendable.extend(Snake, SnakePrototype);
});