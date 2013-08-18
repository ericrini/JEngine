define([
    'src/util/Iterator',
    'src/geometry/Point'
], function (Iterator, Point) {
    'use strict';

    return function (stage) {
        var _self = this;
        var _actors = [];
        var _keyboard = [];
        var _mouse = {
            down: false,
            position: new Point(0, 0),
            delta: new Point(0, 0)
        };

        _self.addActor = function (actor) {
            if (actor.init) {
                actor.init({
                    stage: stage
                });
            }
            _actors.push(actor);
        };

        _self.update = function () {

            // Update the position of all actors.
            Iterator.each(_actors, function (actor) {
                if (actor.update) {
                    actor.update({
                        stage: stage,
                        keyboard: _keyboard,
                        mouse: _mouse
                    });
                }
            });

            // Consume the mouse state.
            _mouse.delta = new Point(0, 0);

            // Trigger collisions on all actors.
            Iterator.each(_actors, function (actor) {
                if (actor.bounds) {
                    Iterator.each(_actors, function (anotherActor) {
                        if (actor !== anotherActor && anotherActor.bounds) {
                            var mtv = actor.bounds.intersects(anotherActor.bounds);
                            if (mtv) {
                                if (actor.collision) {
                                    actor.collision({
                                        actor: anotherActor,
                                        vector: mtv
                                    });
                                }
                            }
                        }
                    });
                }
            });
        };

        _self.render = function (context) {
            Iterator.each(_actors, function (actor) {
                actor.render({
                    context: context
                });
            });
        };

        var init = function () {
            document.addEventListener('keydown', function (event) {
                for (var i = 0; i < _keyboard.length; i++) {
                    var currKey = _keyboard[i];
                    if (event.which === currKey) {
                        return;
                    }
                }
                _keyboard.push(event.which);
                //console.log('Keyboard State', _keyboard);
            });

            document.addEventListener('keyup', function (event) {
                for (var i = 0; i < _keyboard.length; i++) {
                    var currKey = _keyboard[i];
                    if (event.which === currKey) {
                        _keyboard.splice(i, 1);
                        //console.log('Keyboard State', _keyboard);
                        return;
                    }
                }
            });

            stage.canvas.addEventListener('mousedown', function (event) {
                _mouse.down = true;
                //console.log('Mouse State', _mouse);
            });

            stage.canvas.addEventListener('mouseup', function (event) {
                _mouse.down = false;
                //console.log('Mouse State', _mouse);
            });

            stage.canvas.addEventListener('mousemove', function (event) {
                var canvasBounds = stage.canvas.getBoundingClientRect();
                var x = event.x - canvasBounds.left;
                var deltaX = (_mouse.position.x - x) * -1;
                var y = event.y - canvasBounds.top;
                var deltaY = (_mouse.position.y - y) * -1;
                _mouse.delta = new Point(_mouse.delta.x + deltaX, _mouse.delta.y + deltaY);
                _mouse.position = new Point(x, y);
                //console.log('Mouse State', _mouse);
            });
        };
        init();
    };
});
