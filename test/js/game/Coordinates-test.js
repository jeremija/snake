define(['game/Coordinates'], function(Coordinates) {
    describe('test/js/game/Coordinates-test.js', function() {
        it('should be a constructor', function() {
            expect(Coordinates).to.be.a('function');
            expect(Coordinates.prototype).to.be.an('object');
        });

        var coords;
        describe('object construction', function() {
            it('should create a new instance', function() {
                coords = new Coordinates(5, 9);
                expect(coords).to.be.ok();
                expect(coords.x()).to.be(5);
                expect(coords.y()).to.be(9);
            });
        });
        describe('reset()', function() {
            it('should be a function', function() {
                expect(coords.reset).to.be.a('function');
            });
            it('should reset the coords', function() {
                coords.reset(17, 15);
                expect(coords.x()).to.be(17);
                expect(coords.y()).to.be(15);
            });
        });
        describe('duplicate()', function() {
            it('should be a function', function() {
                expect(coords.duplicate).to.be.a('function');
            });
            it('should return an object copy', function() {
                var coords2 = coords.duplicate();
                expect(coords2).to.not.be(coords);
                expect(coords2.x()).to.be(coords.x());
                expect(coords2.y()).to.be(coords.y());
            });
        });
    });

});