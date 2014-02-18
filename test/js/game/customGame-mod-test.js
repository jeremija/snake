define(['game/customGame-mod', 'events/events', 'knockout', 'game/config'],
    function(customGameMod, events, ko, config) {


    describe('test/js/customGame-mod-test.js', function() {
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
            expect(customGameMod).to.be.an('object');
        });
        describe('viewModel', function() {
            it('should be an object', function() {
                expect(customGameMod.viewModel).to.be.an('object');
            });
            it('should have observables defined', function() {
                var vm = customGameMod.viewModel;

                expect(ko.isObservable(vm.pixelMultiplier)).to.be(true);
                expect(ko.isObservable(vm.areaX)).to.be(true);
                expect(ko.isObservable(vm.areaY)).to.be(true);
                expect(ko.isObservable(vm.startLevel)).to.be(true);
                expect(ko.isObservable(vm.startLength)).to.be(true);
                expect(ko.isObservable(vm.visible)).to.be(true);
                expect(ko.isObservable(vm.focus)).to.be(true);

                expect(vm.visible()).to.be(false);
                expect(vm.focus()).to.be(false);
            });
        });
        describe('init()', function() {
            it('should be a function', function() {
                expect(customGameMod.init).to.be.a('function');
            });
            it('should applyBindings to element', function() {
                customGameMod.init(element);
                expect(visible.innerHTML).to.be('false');
            });
            it('should listen to `show-custom-game-module` event', function() {
                expect(events._listeners['show-custom-game-module'].length)
                    .to.be(1);
            });
        });
        describe('event `show-custom-game-module`', function() {
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
            it('dispatch event', function() {
                events.dispatch('show-custom-game-module');
            });
            it('should listen with viewModel.show()', function() {
                expect(events._listeners['show-custom-game-module'][0]
                    .callback).to.be(customGameMod.viewModel.show);
            });
            it('should set the visible observable to true', function() {
                expect(customGameMod.viewModel.visible()).to.be(true);
            });
            it('should read vm values from config', function() {
                var vm = customGameMod.viewModel;
                expect(vm.pixelMultiplier()).to.be(config.pixelMultiplier);
                expect(vm.areaX()).to.be(config.snakeParams.area.x);
                expect(vm.areaY()).to.be(config.snakeParams.area.y);
                expect(vm.startLevel()).to.be(config.level.startLevel);
                expect(vm.startLength()).to.be(config.level.startLength);
            });
            it('should start listening to keydown event', function() {
                expect(events._listeners.keydown.length).to.be(1);
            });
            it('should dispatch pause event', function() {
                expect(paused).to.be(true);
            });
        });
        describe('event `keydown`', function() {
            var closeOrig, closeCalled = false;
            before(function() {
                // mock close()
                closeOrig = customGameMod.viewModel.close;
                customGameMod.viewModel.close = function() {
                    closeCalled = true;
                };
            });
            after(function() {
                // unmock close()
                customGameMod.viewModel.close = closeOrig;
            });
            it('should call the close() function in viewModel', function() {
                events.dispatch('keydown', 27, {
                    keyCode: 27,
                    preventDefault: function() {}
                });
                expect(closeCalled).to.be(true);
            });
        });
        describe('save()', function() {
            var restarted = false;
            function restartListener() {
                restarted = true;
            };
            before(function() {
                events.listen('restart', restartListener);
            });
            after(function() {
                events.unlisten('restart', restartListener);
            });
            it('should update config', function() {
                var vm = customGameMod.viewModel;
                vm.pixelMultiplier(1);
                vm.areaX(2);
                vm.areaY(3);
                vm.startLevel(4);
                vm.startLength(5);

                vm.save();

                expect(config.pixelMultiplier).to.be(1);
                expect(config.snakeParams.area.x).to.be(2);
                expect(config.snakeParams.area.y).to.be(3);
                expect(config.level.startLevel).to.be(4);
                expect(config.level.startLength).to.be(5);

                var x = Math.round(config.snakeParams.area.x / 2);
                var y = Math.round(config.snakeParams.area.y / 2);

                expect(config.snakeParams.position.x).to.be(x);
                expect(config.snakeParams.position.y).to.be(y);
            });
            it('should dispatch `restart` event', function() {
                expect(restarted).to.be(true);
            });
            it('should hide', function() {
                expect(customGameMod.viewModel.visible()).to.be(false);
            });
            it('should stop listening to `keydown`', function() {
                expect(events._listeners.keydown.length).to.be(0);
            });
        });
        describe('close()', function() {
            before(function() {
                customGameMod.viewModel.show();
            });
            after(function() {
            });
            it('should stop listening to `keydown` event', function() {
                customGameMod.viewModel.close();
                expect(events._listeners.keydown.length).to.be(0);
            });
            it('should hide', function() {
                expect(customGameMod.viewModel.visible()).to.be(false);
            });
        });
    });
});