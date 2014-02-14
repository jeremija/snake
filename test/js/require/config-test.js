define([], function() {
    describe('test/js/require/require-test.js', function() {
        it('should load Extendable.js without problems', function(done) {
            require(['Extendable'], function(Extendable) {
                expect(Extendable).to.be.ok();
                expect(Extendable.extend).to.be.a('function');
                done();
            });
        });
    });
});