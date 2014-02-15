define(['Extendable', 'knockout'], function(Extendable, ko) {

    /**
     * Literal representation of the coordinates
     * @typedef {Object} Coords
     * @property {Number} x   x-coordinate
     * @property {Number} y   y-coordinate
     */

    /**
     * @class A class which defines 2D coordinates
     * @name game/Coordinates
     * @param {Number} x
     * @param {Number} y
     */
    function Coordinates(x, y) {
        /**
         * X coordinate
         * @type {Number}
         */
        this.x = ko.observable();
        /**
         * Y coordinate
         * @type {external:ko/observable}
         */
        this.y = ko.observable();
        this.reset(x, y);
    }

    var CoordinatesPrototype = /** @lends game/Coordinates.prototype  */ {
        /**
         * Returns a new instance of Coordinates with the same coords.
         * @return {game/Coordinates}
         */
        duplicate: function() {
            return new Coordinates(this.x(), this.y());
        },
        /**
         * Updates coordinates.
         * @param  {Number} x
         * @param  {Number} y
         */
        reset: function(x, y) {
            this.x(x);
            this.y(y);
        }
    };

    return Extendable.extend(Coordinates, CoordinatesPrototype);

});