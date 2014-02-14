define(['ko/bindingHandlers.coords', 'knockout', 'game/Coordinates',
    'game/config'],
    function(bh, ko, Coordinates, config) {

    describe('test/js/ko/bindingHandlers.coords-test.js', function() {
        it('should be defined', function() {
            expect(ko.bindingHandlers.coords).to.be.an('object');
            expect(ko.bindingHandlers.coords.init).to.be.a('function');
            expect(ko.bindingHandlers.coords.update).to.be.a('function');
        });

        var vm, element;
        before(function() {
            vm = {
                coords: new Coordinates(10, 30)
            };
            element = document.createElement('div');
            element.setAttribute('data-bind', 'coords: coords');
            document.getElementById('test').appendChild(element);
            ko.applyBindings(vm, element);
        });
        after(function() {
            ko.cleanNode(element);
            document.getElementById('test').innerHTML = '';
        });

        describe('init', function() {
            it('should set the element\'s position to absolute', function() {
                expect(element.style.position).to.be('absolute');
                // expect(element.style.width).to.be()
            });
        });
        describe('update', function() {
            it('should update left and bottom variables', function() {
                vm.coords.reset(11, 31);
                expect(element.style.left).to.be(
                    (11 * config.pixelMultiplier) + 'px');
                expect(element.style.bottom).to.be(
                    (31 * config.pixelMultiplier) + 'px');
            });
        });
    });
});