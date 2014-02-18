define(['events/events', 'knockout', 'game/config'],
    function(events, ko, config) {

    var exports = {
        viewModel: {
            newGame: function() {
                events.dispatch('restart');
            },
            customGame: function() {
                events.dispatch('pause');
                events.dispatch('show-custom-game-module');
            },
            pause: function() {
                events.dispatch('pause-toggle');
            },
            about: function() {
                events.dispatch('show-about-mod');
            }
        },
        init: function(element) {
            ko.applyBindings(this.viewModel, element);

            this.keyBindings[config.keys.pause] = function(event) {
                event.preventDefault();
                events.dispatch('pause-toggle');
            };

            events.listen('keydown', this._onkeydown, this);
        },
        _onkeydown: function(keyCode, event) {
            var handler = this.keyBindings[keyCode];
            if (!handler) {
                return;
            }
            handler.call(this, event);
        },
        keyBindings: {
            // F1
            112: function(event) {
                event.preventDefault();
                this.viewModel.about();
                // events.dispatch('pause');
                // document.getElementById('about-link').click();
            },
            // F2
            113: function(event) {
                event.preventDefault();
                this.viewModel.newGame();
            },
            // F3
            114: function(event) {
                event.preventDefault();
                this.viewModel.customGame();
            }
        }
    };

    return exports;
});