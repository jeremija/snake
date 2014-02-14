define(['game/Food'], function(Food) {

    describe('test/js/game/Food-test.js', function() {
        it('should be a constructor', function() {
            expect(Food).to.be.a('function');
            expect(Food.prototype).to.be.an('object');
        });
        var food;
        describe('object construction', function() {
            it('should instantiate without errors', function() {
                food = new Food({
                    area: {
                        x: 7,
                        y: 5
                    }
                });
            });
            it('should respawn', function() {
                var x = food.getX();
                expect(x).to.be.greaterThan(-1);
                expect(x).to.be.lessThan(7);
                var y = food.getY();
                expect(y).to.be.greaterThan(-1);
                expect(y).to.be.lessThan(5);
            });
        });
        describe('respawn()', function() {
            it('should be a function', function() {
                expect(food.respawn).to.be.a('function');
            });
            it('should reset coords', function() {
                food.coords.reset(-1, -1);
                food.respawn();
                var x = food.getX(), y = food.getY();
                expect(x).to.be.greaterThan(-1);
                expect(x).to.be.lessThan(7);
                expect(y).to.be.greaterThan(-1);
                expect(y).to.be.lessThan(5);
            });
        });
    });
});