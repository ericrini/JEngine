define([
    'src/util/Iterator'
], function (Iterator) {
    'use strict';

    return function (stage) {
        var self = this;
        var actors = [];

        self.addActor = function (actor) {
            actor.init(stage.getCanvas());
            actors.push(actor);
        };

        self.update = function (canvas) {
            Iterator.each(actors, function (actor) {
                actor.update(canvas);
            });
        };

        self.render = function (context) {
            Iterator.each(actors, function (actor) {
                actor.render(context);
            });
        };
    };
});
