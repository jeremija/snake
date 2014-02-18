define(['game/menu-mod', 'knockout', 'events/events', 'game/config'],
    function(menuMod, ko, events, config) {

    describe('test/js/game/menu-mod-test.js', function() {
        var element, pauseEl, linkEl;
        before(function() {
            // just in case
            events.clear();

            element = document.createElement('div');
            pauseEl = document.createElement('a');
            pauseEl.setAttribute('data-bind', 'click: pause');
            pauseEl.setAttribute('href', '#');
            element.appendChild(pauseEl);
            linkEl = document.createElement('a');
            linkEl.id = 'about-link';
            element.appendChild(linkEl);
            document.getElementById('test').appendChild(element);
        });
        after(function() {
            ko.cleanNode(element);
            document.getElementById('test').innerHTML = '';

            events.clear();
        });
        it('should be an object', function() {
            expect(menuMod).to.be.an('object');
        });
        describe('init()', function() {

            it('should be a function', function() {
                expect(menuMod.init).to.be.a('function');
            });
            it('should apply bindings', function() {
                menuMod.init();
                expect(!!ko.dataFor(element)).to.be(true);
            });
            it('should start listening to `keydown` event', function() {
                expect(events._listeners.keydown.length).to.be(1);
            });
        });
        describe('viewModel.pause()', function() {
            var pauseToggled = false;
            function pauseToggleListener() {
                pauseToggled = true;
            }
            before(function() {
                events.listen('pause-toggle', pauseToggleListener);
            });
            after(function() {
                events.unlisten('pause-toggle', pauseToggleListener);
            });
            it('should dispatch `pause-toggle` event', function() {
                menuMod.viewModel.pause();
                expect(pauseToggled).to.be(true);
            });
        });
        describe('viewModel.customGame()', function() {
            var paused = false, customGame = false;
            function pauseListener() {
                paused = true;
            }
            function customGameListener() {
                customGame = true;
            }
            before(function() {
                events.listen('pause', pauseListener);
                events.listen('show-custom-game-module', customGameListener);
            });
            after(function() {
                events.unlisten('pause', pauseListener);
                events.unlisten('show-custom-game-module', customGameListener);
            });
            it('should dispatch `pause` event', function() {
                menuMod.viewModel.customGame();
                expect(paused).to.be(true);
            });
            it('should dispatch `show-custom-game-module` event', function() {
                expect(customGame).to.be(true);
            });
        });
        describe('viewModel.newGame()', function() {
            var restarted = false;
            function restartListener() {
                restarted = true;
            }
            before(function() {
                events.listen('restart', restartListener);
            });
            after(function() {
                events.unlisten('restart', restartListener);
            });
            it('should dispatch `restart` event', function() {
                menuMod.viewModel.newGame();
                expect(restarted).to.be(true);
            });
        });
        describe('viewModel.about()', function() {
            var showAboutMod = false;
            function showAboutModListener() {
                showAboutMod = true;
            }
            before(function() {
                events.listen('show-about-mod', showAboutModListener);
            });
            after(function() {
                events.unlisten('show-about-mod', showAboutModListener);
            });
            it('should dispatch `show-about-mod` event', function() {
                menuMod.viewModel.about();
                expect(showAboutMod).to.be(true);
            });
        });
        describe('key bindings', function() {
            var restarted = false, customGame = false, pauseToggled = false,
            about = false,
            newGameOrig, customGameOrig, pauseOrig, aboutOrig;
            function pauseToggleListener() {
                pauseToggled = true;
            }
            before(function() {
                // mock
                newGameOrig = menuMod.viewModel.newGame;
                customGameOrig = menuMod.viewModel.customGame;
                pauseOrig = menuMod.viewModel.pause;
                aboutOrig = menuMod.viewModel.about;

                menuMod.viewModel.newGame = function() {
                    restarted = true;
                };
                menuMod.viewModel.customGame = function() {
                    customGame = true;
                };
                menuMod.viewModel.about = function() {
                    about = true;
                };
                events.listen('pause-toggle', pauseToggleListener);
            });
            after(function() {
                // unmock
                menuMod.viewModel.newGame = newGameOrig;
                menuMod.viewModel.customGame = customGameOrig;
                menuMod.viewModel.pause = pauseOrig;
                menuMod.viewModel.about = aboutOrig;
                events.unlisten('pause-toggle', pauseToggleListener);
            });
            it('should listen to pause key', function() {
                events.dispatch('keydown', config.keys.pause, {
                    keyCode: config.keys.pause,
                    preventDefault: function() {}
                });
                expect(pauseToggled).to.be(true);
            });
            it('should listen to F1 key', function() {
                events.dispatch('keydown', 112, {
                    keyCode: 112,
                    preventDefault: function() {}
                })
                expect(about).to.be(true);
            });
            it('should listen to F2 key', function() {
                events.dispatch('keydown', 113, {
                    keyCode: 113,
                    preventDefault: function() {}
                })
                expect(restarted).to.be(true);
            });
            it('should listen to F3 key', function() {
                events.dispatch('keydown', 114, {
                    keyCode: 114,
                    preventDefault: function() {}
                })
                expect(customGame).to.be(true);
            });
        });
    });
});