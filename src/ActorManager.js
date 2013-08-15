define([
    'src/util/Iterator'
], function (Iterator) {
    'use strict';

    return function (stage) {
        var _self = this;
        var _actors = [];
        var _keyboard = [];

        _self.addActor = function (actor) {
            actor.init({
                stage: stage
            });
            _actors.push(actor);
        };

        _self.update = function () {

            // Update the position of all actors.
            Iterator.each(_actors, function (actor) {
                actor.update({
                    stage: stage,
                    keyboard: _keyboard
                });
            });

            // Trigger collisions on all actors.
            Iterator.each(_actors, function (actor) {
                if (actor.bounds) {
                    Iterator.each(_actors, function (anotherActor) {
                        if (actor !== anotherActor && anotherActor.bounds) {
                            var mtv = actor.bounds.intersects(anotherActor.bounds);
                            if (mtv) {
                                actor.collision({
                                    actor: anotherActor,
                                    vector: mtv
                                });
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

        document.addEventListener('keydown', function (event) {
            for (var i = 0; i < _keyboard.length; i++) {
                var currKey = _keyboard[i];
                if (event.which === currKey) {
                    return;
                }
            }
            _keyboard.push(event.which);
            console.log(_keyboard);
        });

        document.addEventListener('keyup', function (event) {
            for (var i = 0; i < _keyboard.length; i++) {
                var currKey = _keyboard[i];
                if (event.which === currKey) {
                    _keyboard.splice(i, 1);
                    console.log(_keyboard);
                    return;
                }
            }
        });
    };
});
