/**
 * @module events/events
 */
define([], function() {

    /**
     * @callback module:events/events~handler
     * @param {...*} [args] arguments
     */

    var exports = {
        _listeners: {},
        /**
         * Clear all registered listeners
         */
        clear: function() {
            this._listeners = {};
        },
        /**
         * Dispatch event
         * @param {String} eventName  event name
         * @param {...*} [args]     arguments to pass to the event handlers
         */
        dispatch: function(eventName) {
            // var handlers = this._listeners.event1;
            var handlers = this._listeners[eventName];
            if (!handlers) {
                // no handlers, ignore event
                return;
            }
            // do not call splice before because it messes up eventName var
            [].splice.call(arguments, 0, 1);
            var args = arguments;
            handlers.forEach(function(handler) {
                handler.callback.apply(handler.context, args);
            });
        },
        _findIndexOfHandler: function(eventName, handlerCallback) {
            var handlers = this._listeners[eventName];
            for (var i in handlers) {
                var handler = handlers[i];
                if (handler.callback === handlerCallback) {
                    return i;
                }
            }
            return -1;
        },
        /**
         * Subscribe to an event
         * @param  {String} eventName             name of the event
         * @param  {module:events/events~handler} handlerCallback
         * @param  {Object} context               sets the `this` variable
         * for handler
         */
        listen: function(eventName, handlerCallback, context) {
            var listeners = this._listeners;

            var handlers = listeners[eventName];
            if (!handlers) {
                handlers = listeners[eventName] = [];
            }

            if (this._findIndexOfHandler(eventName, handlerCallback) > -1) {
                // do not add duplicate handlers
                return;
            }

            handlers.push({
                callback: handlerCallback,
                context: context
            });
        },
        /**
         * Unsubscribe a specific handler
         * @param  {String} eventName                      name of the event
         * @param  {module:events/events~handler} handler
         */
        unlisten: function(eventName, handlerCallback) {
            var handlers = this._listeners[eventName];
            if (!handlers) {
                // nothind to do
                return;
            }

            var index = this._findIndexOfHandler(eventName, handlerCallback);

            if (index < 0) {
                // handler not found
                return;
            }

            handlers.splice(index, 1);
        }
    };

    return exports;
});