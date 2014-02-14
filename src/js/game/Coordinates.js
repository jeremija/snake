define(['Extendable', 'knockout'], function(Extendable, ko) {

    /**
     * @class A class which defines 2D coordinates
     * @name game/Coordinates
     * @param {Number} x
     * @param {Number} y
     */
    function Coordinates(x, y) {
        this.x = ko.observable();
        this.y = ko.observable();
        // this.x = x;
        // this.y = y;
        this.reset(x, y);
    }

    var CoordinatesPrototype = {
        duplicate: function() {
            return new Coordinates(this.x(), this.y());
        },
        /**
         * Set new coordinates
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