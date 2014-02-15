/**
 * @module game/configurationForm
 */
define(['game/config', 'knockout', 'game/main'], function(config, ko, main) {

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
            show: function() {
                if (!main.isPaused()) {
                    main.pause();
                }

                var vm = exports.viewModel;
                vm.pixelMultiplier(config.pixelMultiplier);
                vm.areaX(config.snakeParams.area.x);
                vm.areaY(config.snakeParams.area.y);
                vm.startLevel(config.level.startLevel);
                vm.startLength(config.level.startLength);

                var form = exports.form;
                form.className = form.className.replace(/\bhidden\b/, '');
            },
            close: function() {
                exports.form.className += ' hidden';
                main.pause();
            },
            save: function() {
                var vm = exports.viewModel;

                set(config, 'pixelMultiplier', vm.pixelMultiplier);
                set(config.snakeParams.area, 'x', vm.areaX);
                set(config.snakeParams.area, 'y', vm.areaY);
                set(config.level, 'startLevel', vm.startLevel);
                set(config.level, 'startLength', vm.startLength);

                exports.form.className += ' hidden';
                main.stop();
                main.reset();
                main.start();
            },
        },
        init: function(element) {
            this.element = element;
            this.form = element.getElementsByClassName('configuration-form')[0];
            ko.applyBindings(this.viewModel, element);
        }
    };

    return exports;

});