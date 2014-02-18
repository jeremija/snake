define(['knockout', 'game/about-mod', 'events/events'],
    function(ko, aboutMod, events) {

    describe('test/js/game/about-mod-test.js', function() {
        var element, visible;
        before(function() {
            // just in case
            events.clear();

            element = document.createElement('div');
            visible = document.createElement('span');
            visible.setAttribute('data-bind', 'text: visible');
            element.appendChild(visible);

            document.getElementById('test').appendChild(element);
        });

        after(function() {
            ko.cleanNode(element);
            document.getElementById('test').innerHTML = '';

            events.clear();
        });

        it('should be an object', function() {
            expect(aboutMod).to.be.an('object');
        });
        describe('viewModel', function() {
            it('should be an object', function() {
                expect(aboutMod.viewModel).to.be.an('object');
            });
            it('should have the `visible` observable', function() {
                expect(ko.isObservable(aboutMod.viewModel.visible)).to.be(true);
            });
            it('should have the `close` function', function() {
                expect(aboutMod.viewModel.close).to.be.a('function');
            });
        });
        describe('init()', function() {
            it('should be a function', function() {
                expect(aboutMod.init).to.be.a('function');
            });
            it('should apply binings', function() {
                aboutMod.init(element);
                expect(!!ko.dataFor(element)).to.be(true);
                expect(visible.innerHTML).to.be('false');
            });
            it('should be hidden', function() {
                expect(aboutMod.viewModel.visible()).to.be(false);
            });
            it('should listen to `show-about-mod` event', function() {
                expect(events._listeners['show-about-mod'].length).to.be(1);
            });
            it('should listen to `keydown` event', function() {
                expect(events._listeners.keydown.length).to.be(1);
            });
        });
        describe('event `show-about-mod`', function() {
            var paused = false;
            function pauseListener() {
                paused = true;
            }
            before(function() {
                events.listen('pause', pauseListener);
            });
            after(function() {
                events.unlisten('pause', pauseListener);
            });
            it('should dispatch pause event', function() {
                events.dispatch('show-about-mod');
                expect(paused).to.be(true);
            });
            it('should update viewModel.visible() to true', function() {
                expect(aboutMod.viewModel.visible()).to.be(true);
            });
        });
        describe('event `keydown` 27 (escape)', function() {
            before(function() {
                aboutMod.viewModel.visible(true);
            });
            it('should update viewModel.visible() to false', function() {
                events.dispatch('keydown', 27, {
                    keyCode: 27,
                    preventDefault: function() {}
                });
                expect(aboutMod.viewModel.visible()).to.be(false);
            });
        });
        describe('viewModel.close()', function() {
            before(function() {
                aboutMod.viewModel.visible(true);
            });
            it('should update viewModel.visible() to false', function() {
                aboutMod.viewModel.close();
                expect(aboutMod.viewModel.visible()).to.be(false);
            });
        });
    });
});