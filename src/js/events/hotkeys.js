/**
 * @module keys/hotkeys
 */
define(['events/events'], function(events) {

    /**
     * @callback module:keys/hotkeys~hotkeyHandler
     * @param {Number} keyCode    code of the key pressed
     */

    var exports = {
        _element: undefined,
        _handlers: [],
        _onkeydown: function(event) {
            events.dispatch('keydown', event.keyCode, event);
        },
        /**
         * Sets the onkeydown callback on the element.
         * @param  {HTMLElement} element
         */
        init: function(element) {
            this._element = element;
            this._element.onkeydown = this._onkeydown.bind(this);
        },
        /**
         * Clears the onkeydown listener on the element
         */
        clear: function() {
            this._element.onkeydown = null;
            this._element = undefined;
        }
    };

    return exports;

});