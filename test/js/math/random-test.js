define(['math/random'], function(random) {
    describe('test/js/math/random.js', function() {
        it('should generate a random number between 0 and max', function() {
            var i = 0;
            while(i < 50) {
                var num = random.generate(10);
                expect(num < 10 && num >= 0).to.be(true);
                i++;
            }
        });
    });
});