define(['Extendable'], function(Extendable) {

    /**
     * @class Logger
     * @name Logger
     * @extends {Extendable}
     * @param {String} p_name      Name of the logger
     * @param {String} p_className (optional) name of the class using the logger
     */
    function Logger(p_name, p_className) {
        var name = p_name || '';
        this.name = p_className ? p_className + ':' + name : name;
    }

    var LoggerPrototype = /** @lends Logger.prototype */ {
        timestamp: Date.now(),
        /**
         * Disable logger or all loggers if set to prototype
         * @type {Boolean}
         */
        disabled: false,
        /**
         * If history is enabled, all log entries will be stored in this array.
         * @type {Array}
         */
        history: [],
        /**
         * Enable logging of history
         * @type {Boolean}
         */
        historyEnabled: true,
        /**
         * Log filter. 0: debug|warn|error, 1: warn|error, 2: error
         * @type {Number}
         */
        threshold: 0,
        _logHistory: function(type, args) {
            var text = '';
            var value = args.forEach(function(arg) {
                text += arg + ' ';
            });
            this.history.push({
                date: Date.now() - this.timestamp,
                type: type,
                text: text
            });
        },
        _getArray: function(p_args) {
            var args = [].slice.call(p_args);
            args.splice(0, 0, this.name + '> ');
            return args;
        },
        _log: function(p_type, p_args) {
            var args = this._getArray(p_args);
            if (!this.disabled && console && console[p_type]) {
                console[p_type].apply(console, args);
            }
            if (!this.disabled && this.historyEnabled) {
                this._logHistory(p_type, args);
            }
            return args;
        },
        /**
         * Log debug
         */
        debug: function() {
            if (this.threshold === 0) {
                return this._log('debug', arguments);
            }
        },
        /**
         * Log warn
         */
        warn: function() {
            if (this.threshold <= 1) {
                return this._log('warn', arguments);
            }
        },
        /**
         * Log error
         */
        error: function() {
            return this._log('error', arguments);
        }
    };

    return Extendable.extend(Logger, LoggerPrototype);
});