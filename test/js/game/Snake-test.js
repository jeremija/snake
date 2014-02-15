define(['game/Snake', 'game/Coordinates'], function(Snake, Coordinates) {
    describe('test/js/game/Snake-test.js', function() {
        it('should be a constructor', function() {
            expect(Snake).to.be.a('function');
            expect(Snake.prototype).to.be.an('object');
        });
        var snake;
        describe('object construction', function() {
            it('should create a new object', function() {
                snake = new Snake({
                    position: {
                        x: 1,
                        y: 2
                    },
                    area: {
                        x: 10,
                        y: 15
                    }
                });
                expect(snake).to.be.ok();
                expect(snake.parts()).to.be.an('array');
                expect(snake.parts().length).to.be(1);

            var coords = snake.parts()[0];
                expect(coords instanceof Coordinates).to.be(true);
                expect(coords.x()).to.be(1);
                expect(coords.y()).to.be(2);
            });
        });
        describe('append()', function() {
            it('should add a new element to the parts array', function() {
                snake.append();
                var parts = snake.parts();
                expect(parts.length).to.be(2);
                var coords1 = parts[0];
                var coords2 = parts[1];
                expect(coords2 instanceof Coordinates).to.be(true);
                expect(coords2).to.not.be(coords1);
                expect(coords2.x()).to.be(coords1.x());
                expect(coords2.y()).to.be(coords1.y());
            });
        });
        describe('getHead()', function() {
            it('should be a function', function() {
                expect(snake.getHead).to.be.a('function');
            });
            it('should return the first item in the parts array', function() {
                var head = snake.getHead();
                expect(head).to.be.ok();
                expect(head).to.be(snake.parts()[0]);
            });
        });
        describe('getTail()', function() {
            it('should be a function', function() {
                expect(snake.getTail).to.be.a('function');
            });
            it('should return the last item in the parts array', function() {
                var tail = snake.getTail();
                expect(tail).to.be.ok();
                expect(tail).to.be(snake.parts()[1]);
            });
        });
        describe('willCrash()', function() {
            it('should be a function', function() {
                expect(snake.willCrash).to.be.a('function');
            });
            it('should return true if outside of area', function() {
                expect(snake.willCrash(0, 0)).to.be(false);
                expect(snake.willCrash(9, 14)).to.be(false);

                expect(snake.willCrash(0, -1)).to.be(true);
                expect(snake.willCrash(-1, 0)).to.be(true);
                expect(snake.willCrash(10, 14)).to.be(true);
                expect(snake.willCrash(9, 15)).to.be(true);
            });
        });
        describe('move()', function() {
            it('should be a function', function() {
                expect(snake.move).to.be.a('function');
            });
            it('should throw error on more than one point', function() {
                expect(snake.move.bind(snake, 0, 0)).to.throwError();
                expect(snake.move.bind(snake, 1, 1)).to.throwError();
                expect(snake.move.bind(snake, -1, 1)).to.throwError();
                expect(snake.move.bind(snake, 1, -1)).to.throwError();
                expect(snake.move.bind(snake, -1, -1)).to.throwError();
                expect(snake.move.bind(snake, 2, 0)).to.throwError();
                expect(snake.move.bind(snake, 0, 2)).to.throwError();
                expect(snake.move.bind(snake, -2, 0)).to.throwError();
                expect(snake.move.bind(snake, 0, -2)).to.throwError();
            });
            it('should set the last item as head & update coords', function() {
                var head = snake.getHead();
                var tail = snake.getTail();
                var headX = head.x();
                var headY = head.y();
                var tailX = tail.x();
                var tailY = tail.y();

                expect(snake.move(0, 1)).to.be(true);

                expect(head.x()).to.be(headX);
                expect(head.y()).to.be(headY);
                expect(tail.x()).to.be(tailX);
                expect(tail.y()).to.be(tailY + 1);

                // old tail is now at first place
                expect(snake.getHead()).to.be(tail);
                // there were only two elements the former head is now a tail
                expect(snake.getTail()).to.be(head);
            });
            it('should return false if it goes outside of range', function() {
                snake.move(-1, 0); // x = 0
                expect(snake.move(-1, 0)).to.be(false); // x = -1
                // because already crashed
                expect(snake.move(1, 0)).to.be(false);
            });
        });
        describe('contains()', function() {
            it('should be a function', function() {
                expect(snake.contains).to.be.a('function');
            });
            it('should return true if any part contains coords', function() {
                snake.parts([
                    new Coordinates(0, 0),
                    new Coordinates(0, 1),
                    new Coordinates(1, 1),
                    new Coordinates(1, 2),
                ]);
                expect(snake.contains(0, 0)).to.be(true);
                expect(snake.contains(0, 1)).to.be(true);
                expect(snake.contains(1, 1)).to.be(true);
                expect(snake.contains(1, 2)).to.be(true);
                expect(snake.contains(2, 2)).to.be(false);
            });
        });
        describe('setNextDirection()', function() {
            before(function() {
                snake = new Snake({
                    area: {
                        x: 30,
                        y: 30
                    },
                    position: {
                        x: 10,
                        y: 10
                    }
                });
            });
            it('should be a function', function() {
                expect(snake.setNextDirection).to.be.a('function');
                expect(snake._getDirection).to.be.a('function');
            });
            it('should have the directionsQueue', function() {
                expect(snake.directionsQueue).to.be.an('array');
                expect(snake.directionsQueue.length).to.be(0);
                expect(snake.lastDirection).to.be(undefined);
            });
            it('should add directions to the end of the queue', function() {
                snake.setNextDirection('up');
                expect(snake.directionsQueue.length).to.be(1);
                expect(snake.directionsQueue[0]).to.be('up');

                snake.setNextDirection('right');
                expect(snake.directionsQueue.length).to.be(2);
                expect(snake.directionsQueue[1]).to.be('right');

                snake.setNextDirection('down');
                expect(snake.directionsQueue.length).to.be(3);
                expect(snake.directionsQueue[2]).to.be('down');

                snake.setNextDirection('left');
                expect(snake.directionsQueue.length).to.be(4);
                expect(snake.directionsQueue[3]).to.be('left');
            });
            it('should not set opposite directions', function() {
                snake.directionsQueue = [];
                snake.lastDirection = 'left';

                snake.setNextDirection('right');
                // should have ignored the right
                expect(snake.directionsQueue.length).to.be(0);

                snake.setNextDirection('up');
                expect(snake.directionsQueue.length).to.be(1);
                expect(snake.directionsQueue[0]).to.be('up');

                snake.setNextDirection('down');
                // should have ignored the down
                expect(snake.directionsQueue.length).to.be(1);
            });
        });
        describe('go()', function() {
            var x, y;
            before(function() {
                snake = new Snake({
                    area: {
                        x: 30,
                        y: 30
                    },
                    position: {
                        x: 10,
                        y: 10
                    }
                });

                snake.lastDirection = 'up';
                var head = snake.getHead();
                x = head.x();
                y = head.y();
            });
            it('should move the snake in the next direction', function() {
                snake.setNextDirection('right');
                snake.setNextDirection('down');

                snake.go();
                var head = snake.getHead();
                var newX = head.x();
                var newY = head.y();

                expect(newX).to.be(x + 1);
                expect(newY).to.be(y);

                snake.go();
                head = snake.getHead();
                newX = head.x();
                newY = head.y();

                expect(newX).to.be(x + 1);
                expect(newY).to.be(y - 1);
            });
            it('should move the snake in the last direction', function() {
                snake.go();
                var head = snake.getHead();
                var newX = head.x();
                var newY = head.y();

                expect(newX).to.be(x + 1);
                expect(newY).to.be(y - 2);
            });
        });
    });
});