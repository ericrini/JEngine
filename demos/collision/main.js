require.config({ baseUrl: '../../' });

define([
    'src/util/Iterator',
    'src/JEngine',
    'src/geometry/Polygon',
    'src/geometry/Matrix'
], function (Iterator, JEngine, Polygon, Matrix) {
    'use strict';

    // Define an actor.
    var Actor = function (x, y, size, radius, move, color) {
        var SPEED = 5;
        var self = this;
        var fill = false;

        self.bounds = new Polygon(size, radius);

        self.id = Math.random();

        self.init = function (event) {
            self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, x, y));
        };

        self.update = function (event) {
            fill = false;
            if (move) {
                if (event.keyboard.indexOf(37) > -1) {
                    self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, -SPEED, 0));
                }
                if (event.keyboard.indexOf(38) > -1) {
                    self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, 0, -SPEED));
                }
                if (event.keyboard.indexOf(39) > -1) {
                    self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, SPEED, 0));
                }
                if (event.keyboard.indexOf(40) > -1) {
                    self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, 0, SPEED));
                }
            }
        };

        self.collision = function (event) {
            fill = true;
        };

        self.render = function (event) {
            event.context.beginPath();
            event.context.moveTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            Iterator.each(self.bounds.vertices, function (vertex, index, vertices) {
                event.context.lineTo(vertex.x, vertex.y);
            });
            event.context.lineTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            if (fill) {
                event.context.fillStyle = 'red';
            }
            else {
                event.context.fillStyle = color;
            }
            event.context.fill();
            event.context.lineWidth = 3;
            event.context.stroke();
        };
    };

    // Define a stage.
    var a1 = new Actor(215, 215, 3, 50, true, 'yellow');
    var a2 = new Actor(100, 100, 8, 75, false, 'blue');
    var a3 = new Actor(300, 300, 5, 75, false, 'blue');
    var container = document.getElementById('container');
    var stage = new JEngine.Stage(container);
    stage.actorManager.addActor(a3);
    stage.actorManager.addActor(a2);
    stage.actorManager.addActor(a1);
    stage.start();
});
