define([], function() {

    var exports = {
        generate: function(max) {
            return Math.floor(Math.random() * max);
        }
    };

    return exports;

});