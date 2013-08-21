require.config({ baseUrl: '../../' });

define([
    'src/util/Iterator',
    'src/JEngine',
    'src/geometry/Polygon',
    'src/geometry/Matrix'
], function (Iterator, JEngine, Polygon, Matrix) {
    'use strict';

    // Define an actor.
    var Actor = function (x, y, size, radius, move, color, highlight) {
        var SPEED = 5;
        var self = this;
        var fill = false;
        var hover = false;
        var drag = false;

        self.bounds = new Polygon(size, radius);

        self.id = Math.random();

        self.init = function (event) {
            self.bounds = self.bounds.transform(new Matrix(1, 0, 0, 1, x, y));
        };

        self.update = function (event) {
            hover = false;
            if (self.bounds.contains(event.mouse.position)) {
                hover = true;
                if (event.mouse.down) {
                    drag = true;
                }
            }
            if (drag && event.mouse.down) {
                self.bounds =  self.bounds.transform(new Matrix(1, 0, 0, 1, event.mouse.delta.x, event.mouse.delta.y));
            }
            else {
                drag = false;
            }
        };

        self.render = function (event) {
            event.context.beginPath();
            event.context.moveTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            Iterator.each(self.bounds.vertices, function (vertex, index, vertices) {
                event.context.lineTo(vertex.x, vertex.y);
            });
            event.context.lineTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            if (hover || drag) {
                event.context.fillStyle = highlight;
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
    var a1 = new Actor(200, 100, 3, 50, true, 'darkgreen', 'lime');
    var a2 = new Actor(100, 200, 5, 75, true, 'darkblue', 'cyan');
    var a3 = new Actor(300, 200, 8, 100, true, 'teal', 'aquamarine');
    var container = document.getElementById('container');
    var stage = new JEngine.Stage(container);
    stage.actorManager.addActor(a1);
    stage.actorManager.addActor(a2);
    stage.actorManager.addActor(a3);
    stage.start();
});
