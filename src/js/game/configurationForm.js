/**
 * @module game/configurationForm
 */
define(['game/config', 'knockout', 'game/main'], function(config, ko, main) {

    var exports = {
        viewModel: {
            pixelMultiplier: ko.observable(),
            areaX: ko.observable(),
            areaY: ko.observable(),
            startLevel: ko.observable(),
            startLength: ko.observable(),
            show: function() {
                main.stop();

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

                main.stop();
                main.reset();
                main.start();
            },
            save: function() {
                var vm = exports.viewModel;
                config.pixelMultiplier = vm.pixelMultiplier();
                config.snakeParams.area.x = vm.areaX();
                config.snakeParams.area.y = vm.areaY();
                config.level.startLevel = vm.startLevel();
                config.level.startLength = vm.startLength();

                vm.close();
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