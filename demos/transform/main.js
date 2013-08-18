require.config({ baseUrl: '../../' });

define([
    'src/util/Iterator',
    'src/JEngine',
    'src/geometry/Polygon',
    'src/geometry/Matrix'
], function (Iterator, JEngine, Polygon, Matrix) {
    'use strict';

    var Actor = function (color) {
        var self = this;

        self.bounds = new Polygon(5, 100);

        self.init = function () {
            self.bounds.transform(new Matrix().translate(220, 140));
        };

        self.update = function (event) {

            // Rotate
            if (event.keyboard.indexOf(16) > -1 && event.keyboard.indexOf(82) > -1) {
                self.bounds.transform(new Matrix().rotate(1));
            }
            else if (event.keyboard.indexOf(82) > -1) {
                self.bounds.transform(new Matrix().rotate(-1));
            }

            // Directional
            else if (event.keyboard.indexOf(37) > -1) {

                // Skew
                if (event.keyboard.indexOf(83) > -1) {
                    self.bounds.transform(new Matrix().skew(-0.1, 0));
                }

                // Scale
                if (event.keyboard.indexOf(67) > -1) {
                    self.bounds.transform(new Matrix().scale(-0.1, 0));
                }

                // Mirror
                if (event.keyboard.indexOf(77) > -1) {
                    self.bounds.transform(new Matrix().mirrorHorizontal());
                }

                // Translate
                else {
                    self.bounds.transform(new Matrix().translate(-3, 0));
                }
            }
            if (event.keyboard.indexOf(38) > -1) {

                // Skew
                if (event.keyboard.indexOf(83) > -1) {
                    self.bounds.transform(new Matrix().skew(0, -0.1));
                }

                // Scale
                if (event.keyboard.indexOf(67) > -1) {
                    self.bounds.transform(new Matrix().scale(0, -0.1));
                }

                // Mirror
                if (event.keyboard.indexOf(77) > -1) {
                    self.bounds.transform(new Matrix().mirrorVertical());
                }

                // Translate
                else {
                    self.bounds.transform(new Matrix().translate(0, -3));
                }
            }
            if (event.keyboard.indexOf(39) > -1) {

                // Skew
                if (event.keyboard.indexOf(83) > -1) {
                    self.bounds.transform(new Matrix().skew(0.1, 0));
                }

                // Scale
                if (event.keyboard.indexOf(67) > -1) {
                    self.bounds.transform(new Matrix().scale(0.1, 0));
                }

                // Mirror
                if (event.keyboard.indexOf(77) > -1) {
                    self.bounds.transform(new Matrix().mirrorHorizontal());
                }

                // Translate
                else {
                    self.bounds.transform(new Matrix().translate(3, 0));
                }
            }
            if (event.keyboard.indexOf(40) > -1) {

                // Skew
                if (event.keyboard.indexOf(83) > -1) {
                    self.bounds.transform(new Matrix().skew(0, 0.1));
                }

                // Scale
                if (event.keyboard.indexOf(67) > -1) {
                    self.bounds.transform(new Matrix().scale(0, 0.1));
                }

                // Mirror
                if (event.keyboard.indexOf(77) > -1) {
                    self.bounds.transform(new Matrix().mirrorVertical());
                }

                // Translate
                else {
                    self.bounds.transform(new Matrix().translate(0, 3));
                }
            }
        };

        self.render = function (event) {
            event.context.beginPath();
            event.context.moveTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            Iterator.each(self.bounds.vertices, function (vertex, index, vertices) {
                event.context.lineTo(vertex.x, vertex.y);
            });
            event.context.lineTo(self.bounds.vertices[0].x, self.bounds.vertices[0].y);
            event.context.fillStyle = 'cadetblue';
            event.context.fill();
            event.context.strokeStyle = 'black';
            event.context.lineWidth = 3;
            event.context.stroke();
        };
    };

    var stage = new JEngine.Stage(document.getElementById('container'));
    stage.actorManager.addActor(new Actor());
    stage.start();
});
