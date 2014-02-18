
/**
 * @module game/about-mod
 */
define(['knockout', 'events/events'], function(ko, events) {

    var exports = {
        viewModel: {
            visible: ko.observable(false),
            close: function() {
                exports.viewModel.visible(false);
            }
        },
        init: function(element) {
            events.listen('show-about-mod', this._showHandler, this);
            events.listen('keydown', this._keydownListener, this);
            ko.applyBindings(this.viewModel, element);
        },
        _keydownListener: function(keyCode, event) {
            if (keyCode === 27) {
                event.preventDefault();
                this.viewModel.close();
            }
        },
        _showHandler: function() {
            events.dispatch('pause');
            this.viewModel.visible(true);
        }
    };

    return exports;

});