define(['events/events'], function(events) {

    describe('test/js/events/events-test.js', function() {
        var listener1, listener2, args1, args2, context1, context2,
            context = {};
        before(function() {
            listener1 = function() {
                args1 = arguments;
                context1 = this;
            };
            listener2 = function() {
                args2 = arguments;
                context2 = this;
            };
        });

        it('should be an object', function() {
            expect(events).to.be.an('object');
        });

        describe('listen()', function() {
            it('should be a function', function() {
                expect(events.listen).to.be.a('function');
            });
            it('should add event listener', function() {
                events.listen('event1', listener1);
                events.listen('event1', listener2, context);

                expect(events._listeners.event1).to.be.an('array');
                expect(events._listeners.event1.length).to.be(2);
            });
            it('should prevent adding of same listener twice', function() {
                events.listen('event1', listener2);
                expect(events._listeners.event1.length).to.be(2);
            });
        });

        describe('dispatch()', function() {
            it('should be a function', function() {
                expect(events.dispatch).to.be.a('function');
            });
            it('should dispatch events to both listeners', function() {
                events.dispatch('event1', 1, 2, 3);
                expect(args1.length).to.be(3);
                expect(args1[0]).to.be(1);
                expect(args1[1]).to.be(2);
                expect(args1[2]).to.be(3);
                expect(context1).to.be(window);

                expect(args2.length).to.be(3);
                expect(args2[0]).to.be(1);
                expect(args2[1]).to.be(2);
                expect(args2[2]).to.be(3);
                expect(context2).to.be(context);
            });
        });

        describe('unlisten()', function() {
            before(function() {
                args1 = null;
                args2 = null;
            });
            it('should be a function', function() {
                expect(events.unlisten).to.be.a('function');
            });
            it('should remove event handler', function() {
                events.unlisten('event1', listener2);
                expect(events._listeners.event1.length).to.be(1);

                events.dispatch('event1', 1, 2);
                expect(args1.length).to.be(2);
                expect(args2).to.be(null);

                events.unlisten('event1', listener1);
                expect(events._listeners.event1.length).to.be(0);
            });
        });

        describe('clear()', function() {
            it('should be a function', function() {
                expect(events.clear).to.be.a('function');
            });
            it('should remove all listeners for all events', function() {
                events.listen('event2', function() {});
                events.listen('event3', function() {});
                events.listen('event4', function() {});

                events.clear();
                expect(events._listeners.event1).to.not.be.ok();
                expect(events._listeners.event2).to.not.be.ok();
                expect(events._listeners.event3).to.not.be.ok();
                expect(events._listeners.event4).to.not.be.ok();
            });
        });

    });
});