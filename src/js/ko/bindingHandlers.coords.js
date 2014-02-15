define(['knockout', 'game/config'], function(ko, config) {

    /**
     * Binding handler for {@link game/Coordinates}. Will set the element's
     * position to `absolute`, update it's width and height to match the
     * {@link module:game/config.pixelMultiplier} property, and update the
     * element style's left and bottom values.
     * @function external:ko/BindingHandlers#coords
     * @param {game/Coordinates}     coords
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