
/**
 * @module game/about-mod
 */
define(['knockout', 'events/events'], function(ko, events) {

    var exports = {
        viewModel: {
            visible: ko.observable(false),
            close: function() {
                exports._hide();
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
            events.listen('hide-modules', this._hide, this);
            this.viewModel.visible(true);
        },
        _hide: function() {
            this.viewModel.visible(false);
            events.unlisten('hide-modules', this._hide);
        }
    };

    return exports;

});