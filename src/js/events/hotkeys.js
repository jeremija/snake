/**
 * @module keys/hotkeys
 */
define(['events/events', 'hammer', 'game/config'],
    function(events, hammer, config) {

    /**
     * Event dispatched when a key is pressed
     * @event module:events/events#keydown
     */

    /**
     * @callback module:keys/hotkeys~hotkeyHandler
     * @param {Number} keyCode    code of the key pressed
     */

    var exports = {
        _element: undefined,
        _handlers: [],
        /**
         * Listener for onkeydown event
         * @fires keydown
         * @param  {Event} event
         */
        _onkeydown: function(event) {
            events.dispatch('keydown', event.keyCode, event);
        },
        /**
         * Sets the onkeydown callback on the element.
         * @param {HTMLElement} element
         */
        init: function(element, swipeElement) {
            this._element = element;
            this._element.onkeydown = this._onkeydown.bind(this);
            this._swipeElement = swipeElement || element;

            // enable hammer gestures
            hammer(this._swipeElement).on('drag swipe', this._swipeHandler);
        },
        _lastSwipeDirection: undefined,
        _swipeHandler: function(event) {
            /**
             * This is to fix hammerjs issue #124. Apparently there is a bug
             * in chrome on android and it sometimes does not dispatch the
             * touchend event.
             * {@link: https://github.com/EightMedia/hammer.js/issues/124}
             */
            event.gesture.preventDefault();
            var direction = event.gesture.direction;
            if (exports._lastSwipeDirection === direction) {
                // do not trigger same direction twice, fixes performance issues
                // because event.gesture.preventDefault() results in multiple
                // dispatched events resulting from the same gesture
                return;
            }
            exports._lastSwipeDirection = direction;
            events.dispatch('keydown', config.keys[direction], event);
        },
        /**
         * Clears the onkeydown listener on the element
         */
        clear: function() {
            // disable hammer
            hammer(this._swipeElement).off('drag swipe', this._swipeHandler);
            this._swipeElement = undefined;

            this._element.onkeydown = null;
            this._element = undefined;
        }
    };

    return exports;

});