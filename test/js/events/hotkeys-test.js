define(['events/hotkeys', 'events/events', 'hammer', 'game/config'],
    function(hotkeys, events, hammer, config) {

    describe('test/js/keys/hotkeys-test.js', function() {
        var element;
        before(function() {
            element = document.createElement('div');
            element.id = 'keys';
            document.getElementById('test').appendChild(element);
        });
        after(function() {
            document.getElementById('test').innerHTML = '';
        });
        afterEach(function() {
            events.clear();
        });

        it('should be an object', function() {
            expect(hotkeys).to.be.an('object');
        });

        describe('init()', function() {
            it('shoud be a function', function() {
                expect(hotkeys.init).to.be.a('function');
            });
            it('should set element\'s onkeydown', function() {
                hotkeys.init(element);
                expect(element.onkeydown).to.be.a('function');
                expect(hotkeys._element).to.be(element);
            });
        });

        describe('fake keypress', function() {
            it('should dispatch keydown event on key press', function() {
                var code;
                events.listen('keydown', function(keyCode) {
                    code = keyCode;
                });
                element.onkeydown({
                    keyCode: 156
                });
                expect(code).to.be(156);
            });
        });

        describe('hammer swipe events', function() {
            it('should dispatch keydown event', function() {
                var code;
                events.listen('keydown', function(keyCode) {
                    code = keyCode;
                });
                hammer(element).trigger('drag', {
                    direction: 'left'
                });
                expect(code).to.be(config.keys.left);
            });
        });

        describe('clear()', function() {
            it('shoud be a function', function() {
                expect(hotkeys.clear).to.be.a('function');
            });
            it('should remove event listener', function() {
                hotkeys.clear();
                expect(element.onkeydown).to.be(null);
                expect(hotkeys._element).to.be(undefined);
            });
        });

    });
});