define(['knockout', 'game/config'], function(ko, config) {

    /**
     * Sets the element's class to rotate an element. It will replace any
     * other class set on the element.
     * @function external:ko/BindingHandlers#rotate
     * @param {Object}     options         configuration object
     * @param {Observable} options.angle   Rotation degrees
     * Valid values is any number between 0 and 359.
     * @param {String}     className
     */
    ko.bindingHandlers.coords = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            element.style.position = 'absolute';
            element.style.width = config.pixelMultiplier + 'px';
            element.style.height = config.pixelMultiplier + 'px';
            // element.style['background-color'] = 'black';
        },
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            var coords = valueAccessor();

            var x = ko.utils.unwrapObservable(coords.x);
            var y = ko.utils.unwrapObservable(coords.y);

            element.style.left = config.pixelMultiplier * x + 'px';
            element.style.bottom = config.pixelMultiplier * y + 'px';
        }
    };

});