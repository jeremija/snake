define(['game/main', 'knockout', 'game/config', 'game/Snake', 'game/Food',
    'game/Coordinates'],
    function(main, ko, config, Snake, Food, Coordinates) {
    describe('test/js/game/main-test.js', function() {
        it('should be ok', function() {
            expect(main).to.be.an('object');
        });
        it('should have observables set', function() {
            expect(main.viewModel).to.be.an('object');
            var vm = main.viewModel;
            expect(ko.isObservable(vm.snake)).to.be(true);
            expect(ko.isObservable(vm.food)).to.be(true);
            expect(ko.isObservable(vm.score)).to.be(true);
            expect(ko.isObservable(vm.level)).to.be(true);

            expect(vm.snake()).to.not.be.ok();
            expect(vm.food()).to.not.be.ok();
            expect(vm.score()).to.be(0);
            expect(vm.level()).to.be(1);
        });
        var element, scoreElement, snakeArea, levelElement, snakeElement;
        before(function() {
            element = document.createElement('div');
            element.id = 'main-game-layer';

            snakeArea = document.createElement('div');
            snakeArea.className = 'snake-area';

            scoreElement = document.createElement('span');
            scoreElement.setAttribute('data-bind', 'text: score');

            levelElement = document.createElement('span');
            levelElement.setAttribute('data-bind', 'text: level');

            snakeArea.appendChild(scoreElement);
            snakeArea.appendChild(levelElement);
            element.appendChild(snakeArea);

            document.getElementById('test').appendChild(element);
        });
        after(function() {
            ko.cleanNode(element);
            document.getElementById('test').innerHTML = '';
        });

        describe('init()', function() {
            var vm, snake;
            it('should be a function', function() {
                expect(main.init).to.be.a('function');
                vm = main.viewModel;
            });
            it('should reset the game', function() {
                main.init({
                    gameElement: element,
                    keysElement: document
                });

                snake = vm.snake();
                expect(snake).to.be.ok();
                expect(snake instanceof Snake).to.be(true);
                expect(vm.score()).to.be(0);
                expect(vm.level()).to.be(1);
            });
            it('should have created the food', function() {
                var food = vm.food();
                expect(food instanceof Food).to.be(true);
                expect(food.area.x()).to.be(snake.area.x());
                expect(food.area.y()).to.be(snake.area.y());
            });
            it('should have set the _interval', function() {
                expect(main._interval).to.be.greaterThan(0);
                expect(main._interval).to.be(config.level.interval);
            });
            it('should apply knockout bindings', function() {
                expect(scoreElement.innerHTML).to.be('0');
                expect(levelElement.innerHTML).to.be('1');

                vm.score(3);
                vm.level(4);
                expect(scoreElement.innerHTML).to.be('3');
                expect(levelElement.innerHTML).to.be('4');
            });
        });
        describe('reset()', function() {
            var vm, snake;
            before(function() {
                vm = main.viewModel;
                vm.score(30);
                vm.level(3);
                snake = vm.snake();
            });
            it('should be a function', function() {
                expect(main.reset).to.be.a('function');
                main.reset();
            });
            it('should reset the score and level', function() {
                expect(vm.score()).to.be(0);
                expect(vm.level()).to.be(1);
            });
            it('should create a new snake', function() {
                var snake2 = vm.snake();
                expect(snake2).to.not.be(snake);
                expect(snake2 instanceof Snake).to.be(true);
                // parts is an observableArray
                expect(snake2.parts().length).to.be(3);
            });
        });
        describe('addScore()', function() {
            var startInterval, intervalDivider;
            before(function() {
                config.level.threshold = 3;
                intervalDivider = config.level.intervalDivider = 2;
                main.viewModel.score(0);
                main.viewModel.level(1);
                startInterval = main._interval;
            });
            it('should add score', function() {
                main.addScore();
                expect(main._interval).to.be(startInterval);
                expect(main.viewModel.score()).to.be(1);
                expect(main.viewModel.level()).to.be(1);

                main.addScore();
                expect(main._interval).to.be(startInterval);
                expect(main.viewModel.score()).to.be(2);
                expect(main.viewModel.level()).to.be(1);

                main.addScore();
                expect(main._interval).to.be(startInterval / intervalDivider);
                expect(main.viewModel.score()).to.be(3);
                expect(main.viewModel.level()).to.be(2);

                main.addScore();
                expect(main._interval).to.be(startInterval / intervalDivider);
                expect(main.viewModel.score()).to.be(4);
                expect(main.viewModel.level()).to.be(2);

                main.addScore();
                expect(main._interval).to.be(startInterval / intervalDivider);
                expect(main.viewModel.score()).to.be(5);
                expect(main.viewModel.level()).to.be(2);

                main.addScore();
                expect(main._interval).to.be(startInterval / intervalDivider /
                    intervalDivider);
                expect(main.viewModel.score()).to.be(6);
                expect(main.viewModel.level()).to.be(3);
            });
        });
        describe('start() and stop()', function() {
            var snake;
            beforeEach(function() {
                main.reset();
                snake = main.viewModel.snake();
            });
            afterEach(function() {
                // save just in case stop() does not actually stop the interval
                var intervalId =  main._intervalId;

                main.stop();

                // just in case
                window.clearTimeout(intervalId);
            });
            function fakeKeyPress(keyCode) {
                main._keysElement.onkeydown({
                    keyCode: keyCode
                });
            }
            it('should start the interval timer', function(done) {
                var goCount = 0;
                snake.go = function() {
                    goCount++;
                    return true;
                };

                main._interval = 10;
                main.start();
                expect(main._intervalId).to.be.a('number');

                setTimeout(function() {
                    expect(goCount).to.be.greaterThan(3);
                    done();
                }, 50);
            });

            it('should be listening to keypress events', function(done) {
                var initialX = snake.getHead().x();
                var initialY = snake.getHead().y();

                main._interval = 10;
                main.start();

                expect(snake.getDirection()).to.not.be.ok();

                fakeKeyPress(config.keys.left);
                expect(snake.getDirection()).to.be('left');
                // should only allow single set of direction in an interval
                fakeKeyPress(config.keys.up);
                expect(snake.getDirection()).to.be('left');

                setTimeout(function() {
                    var head = snake.getHead();
                    expect(head.x()).to.be(initialX - 1);
                    expect(head.y()).to.be(initialY);

                    // should not allow 180 degree turns
                    fakeKeyPress(config.keys.right);
                    expect(snake.getDirection()).to.be('left');
                    fakeKeyPress(config.keys.up);
                    expect(snake.getDirection()).to.be('up');
                }, 15);

                setTimeout(function() {
                    var head = snake.getHead();
                    expect(head.x()).to.be(initialX - 1);
                    expect(head.y()).to.be(initialY + 1);

                    fakeKeyPress(config.keys.left);
                    expect(snake.getDirection()).to.be('left');
                }, 25);

                setTimeout(function() {
                    var head = snake.getHead();
                    expect(head.x()).to.be(initialX - 2);
                    expect(head.y()).to.be(initialY + 1);
                    done();
                }, 35);
            });

            it('should restart itself after crash', function(done) {
                snake.willCrash = function() {
                    // fake a crash
                    return true;
                };


                main._interval = 10;
                main._respawnTimeout = 20;
                main.start();

                snake.setNextDirection('left');
                expect(snake.getDirection()).to.be('left');

                expect(main._intervalId).to.be.a('number');

                setTimeout(function() {
                    expect(snake.crashed).to.be(true);
                    expect(main._intervalId).to.not.be.ok();
                }, 15);

                setTimeout(function() {
                    expect(main._intervalId).to.be.a('number');

                    var snake2 = main.viewModel.snake();
                    // should be replaced by a new snake
                    expect(snake2).to.be.ok();
                    expect(snake2).to.not.be(snake);
                    expect(snake2.crashed).to.be(false);
                    done();
                }, 35);
            });
        });
    });
});