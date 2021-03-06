/**
 * Main game module
 * @module game/main
 */
define(['game/config', 'game/Snake', 'game/Food', 'knockout', 'events/events'],
    function(config, Snake, Food, ko, events) {

    var exports = {
        /**
         * Interval for the timer
         * @type {Number}
         */
        _interval: undefined,
        /**
         * Interval id of the timer. This makes it able to stop the timer
         * @type {Number}
         */
        _intervalId: undefined,
        /**
         * View model for knockout binding
         * @type {Object}
         */
        viewModel: {
            /**
             * @type {Observable.<game/Snake>}
             */
            snake: ko.observable(),
            food: ko.observable(),
            /**
             * @type {Observable.<Number>}
             */
            score: ko.observable(0),
            /**
             * @type {Observable.<Number>}
             */
            level: ko.observable(1),
            /**
             * Can be 'started', 'paused' or 'crashed'
             * @type {Observable.<String>}
             */
            status: ko.observable()
        },
        /**
         * Initializes the main game module. Call this function only once.
         * @param {Object}     params              configuration object
         * @param {HTMLElement} params.gameElement    Element in which the game
         * will be displayed
         */
        init: function(params) {
            this._gameElement = params.gameElement;
            this._gameElement.className += ' ready';

            this.reset();

            ko.applyBindings(this.viewModel, params.gameElement);

            events.listen('pause', function() {
                if (!this.isPaused()) {
                    this.pause();
                }
            }, this);
            events.listen('unpause', function() {
                if (this.isPaused()) {
                    this.pause();
                }
            }, this);
            events.listen('restart', this.restart, this);
            events.listen('pause-toggle', this.pause, this);
        },
        resize: function() {
            var area =
                this._gameElement.getElementsByClassName('snake-area')[0];

            area.style.width = config.snakeParams.area.x *
                config.pixelMultiplier + 'px';
            area.style.height = config.snakeParams.area.y *
                config.pixelMultiplier + 'px';
            area.style.position = 'relative';
        },
        /**
         * Resets the score and level, sets up a new snake, respawns food
         * and rereads the interval from the {@link module:game/config}
         */
        reset: function() {
            this.resize();

            var vm = this.viewModel;
            vm.score(0);
            vm.level(config.level.startLevel);
            vm.snake(this._generateSnake());
            vm.food(new Food({
                area: config.snakeParams.area
            }));
            this.respawnFood();
            this._interval = config.level.interval /
                Math.pow(config.level.intervalDivider,
                    config.level.startLevel - 1);
        },
        /**
         * Respawns the food. Calls {@link game/Food#respawn} until the
         * coordinate pair is found which is not in the snake's place
         */
        respawnFood: function() {
            var viewModel = this.viewModel;

            var snake = viewModel.snake();

            var food = this.viewModel.food();
            while(snake.contains(food.getX(), food.getY())) {
                food.respawn();
            }
        },
        /**
         * Adds a point to the total score. If the last level's total point
         * count is over the {@link module:game/config#level.threshold}, the
         * level is advanced too
         */
        addScore: function() {
            var viewModel = this.viewModel;

            var score = viewModel.score();
            viewModel.score(++score);

            if (score % config.level.threshold === 0) {
                // var level = viewModel.level();
                // viewModel.level(++level);
                this._advanceLevel();
            }
        },
        /**
         * Start the main interval loop which moves the snake. Also sets up
         * the keypress listeners.
         */
        start: function() {
            if (this._intervalId) {
                throw new Error('start() called twice');
            }

            var viewModel = this.viewModel;
            viewModel.status('started');
            var food = viewModel.food();
            var snake = viewModel.snake();
            var self = this;

            this._intervalId = window.setInterval(function() {

                var crashed = !snake.go();

                if (crashed) {
                    self.stop('crashed');
                    return;
                }

                if (snake.contains(food.getX(), food.getY())) {
                    self.respawnFood();
                    self.addScore();
                    snake.append();
                }
            }, this._interval);

            this.bindHotkeys();
        },
        restart: function() {
            this.stop();
            this.reset();
            this.start();
        },
        /**
         * Stops the main interval loop
         * @param {String} status    status to set after stopping. Should be
         * 'paused' or 'crashed'.
         */
        stop: function(status) {
            this.viewModel.status(status);
            window.clearInterval(this._intervalId);
            this._intervalId = undefined;
            this.unbindHotkeys();
        },
        /**
         * Toggles the state between 'started' and 'paused'. If the state is
         * 'crashed', will not do anything.
         */
        pause: function() {
            if (this.viewModel.status() === 'crashed') {
                return;
            }
            if (this.isStarted()) {
                this.stop('paused');
                return;
            }
            this.start();
        },
        /**
         * Checks if interval is set
         * @return {Boolean} true if interval is set.
         */
        isStarted: function() {
            return !!this._intervalId;
        },
        /**
         * Checks if status is 'paused'.
         * @return {Boolean}
         */
        isPaused: function() {
            return this.viewModel.status() === 'paused';
        },
        _keydownListener: function(keyCode) {
            var snake = this.viewModel.snake();
            switch(keyCode) {
                case config.keys.left:
                    snake.setNextDirection('left');
                    break;
                case config.keys.up:
                    snake.setNextDirection('up');
                    break;
                case config.keys.right:
                    snake.setNextDirection('right');
                    break;
                case config.keys.down:
                    snake.setNextDirection('down');
                    break;
            }
        },
        /**
         * Listens to the keypress events
         */
        bindHotkeys: function() {
            events.listen('keydown', this._keydownListener, this);
        },
        unbindHotkeys: function() {
            events.unlisten('keydown', this._keydownListener);
        },
        /**
         * Increases the level count in the viewModel, changes the interval
         * and resets the interval timer.
         */
        _advanceLevel: function() {
            var viewModel = this.viewModel;
            var level = viewModel.level();
            viewModel.level(++level);
            this._interval /= config.level.intervalDivider;

            if (this._intervalId) {
                this.stop();
                this.start();
            }
        },
        /**
         * Configures a new snake
         */
        _generateSnake: function() {
            var snake = new Snake(config.snakeParams);

            var i = 1;
            while(i < config.level.startLength) {
                snake.append();
                i++;
            }

            return snake;
        }
    };

    return exports;

});
