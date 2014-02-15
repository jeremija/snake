define(['Extendable', 'game/Coordinates', 'math/random'],
    function(Extendable, Coordinates, random) {

    /**
     * @class Represents the food for snake
     * @name game/Food
     * @param {Object} params           configuration params
     * @param {Object} params.area
     * @param {Object} params.area.x
     * @param {Object} params.area.y
     */
    function Food(params) {
        this.coords = new Coordinates(-1, -1);

        var area = params.area;
        this.area = new Coordinates(area.x, area.y);

        this.respawn();
    }

    var FoodPrototype = /** @lends game/Food.prototype */ {
        respawn: function() {
            var area = this.area;
            var maxX = area.x();
            var maxY = area.y();

            var x = random.generate(maxX);
            var y = random.generate(maxY);

            this.coords.reset(x, y);
        },
        getX: function() {
            return this.coords.x();
        },
        getY: function() {
            return this.coords.y();
        }
    };

    return Extendable.extend(Food, FoodPrototype);

});