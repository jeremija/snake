/**
 * @module game/configurationForm
 */
define(['game/config', 'knockout', 'events/events'],
    function(config, ko, events) {

    function set(object, property, observable) {
        var value = observable();
        if (!value || isNaN(value)) {
            return;
        }
        object[property] = value;
    }

    var exports = {
        viewModel: {
            pixelMultiplier: ko.observable(),
            areaX: ko.observable(),
            areaY: ko.observable(),
            startLevel: ko.observable(),
            startLength: ko.observable(),
            visible: ko.observable(false),
            focus: ko.observable(false),
            show: function() {
                events.dispatch('pause');

                var vm = exports.viewModel;
                vm.pixelMultiplier(config.pixelMultiplier);
                vm.areaX(config.snakeParams.area.x);
                vm.areaY(config.snakeParams.area.y);
                vm.startLevel(config.level.startLevel);
                vm.startLength(config.level.startLength);

                vm.visible(true);
                vm.focus(true);

                events.listen('keydown', exports.onkeydown, exports);
            },
            close: function() {
                exports.viewModel.visible(false);
                events.unlisten('keydown', exports.onkeydown);
                events.dispatch('unpause');
            },
            save: function() {
                var vm = exports.viewModel;

                set(config, 'pixelMultiplier', vm.pixelMultiplier);
                set(config.snakeParams.area, 'x', vm.areaX);
                set(config.snakeParams.area, 'y', vm.areaY);
                set(config.level, 'startLevel', vm.startLevel);
                set(config.level, 'startLength', vm.startLength);

                config.snakeParams.position.x =
                    Math.round(config.snakeParams.area.x / 2);
                config.snakeParams.position.y =
                    Math.round(config.snakeParams.area.y / 2);

                exports.viewModel.visible(false);

                events.dispatch('restart');
            },
        },
        init: function(element) {
            this.element = element;
            ko.applyBindings(this.viewModel, element);

            events.listen('show-custom-game-module', this.viewModel.show, this);
        },
        onkeydown: function(keyCode, event) {
            // escape
            if (keyCode === 27) {
                event.preventDefault();
                this.viewModel.close();
            }
        }
    };

    return exports;

});