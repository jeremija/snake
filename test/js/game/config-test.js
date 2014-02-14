define(['game/config'], function(config) {
    describe('test/js/game/config-test.js', function() {
        it('should be an object', function() {
            expect(config).to.be.an('object');
        });
        it('should have the key codes defined', function() {
            expect(config.keys).to.be.an('object');
            expect(config.keys.left).to.be(37);
            expect(config.keys.up).to.be(38);
            expect(config.keys.right).to.be(39);
            expect(config.keys.down).to.be(40);
        });
        it('should have the snake params defined', function() {
            expect(config.snakeParams).to.be.an('object');

            var pos = config.snakeParams.position;
            var area = config.snakeParams.area;
            expect(pos).to.be.an('object');
            expect(config.snakeParams.area).to.be.an('object');
            expect(pos.x >= 0).to.be(true);
            expect(pos.y >= 0).to.be(true);
            expect(area.x > pos.x).to.be(true);
            expect(area.y > pos.y).to.be(true);
        });
        it('should have the initial level defined', function() {
            expect(config.level).to.be.an('object');
            expect(config.level.interval).to.be.greaterThan(0);
            expect(config.level.intervalDivider).to.be.greaterThan(1);
        });
    });
});