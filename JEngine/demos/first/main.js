require.config({ baseUrl: '../../' });

define([
    'src/JEngine'
], function (JEngine) {
    'use strict';

    // Define an actor.
    var Actor = function (color) {
        var self = this;

        self.init = function (canvas) {
            self.x = Math.floor(Math.random() * (canvas.width - 100)) + 50;
            self.y = Math.floor(Math.random() * (canvas.height - 100)) + 50;
            self.xInertia = Math.floor(Math.random() * 4) + 1;
            self.yInertia = Math.floor(Math.random() * 4) + 1;
        };

        self.update = function (canvas) {
            if (self.x - 50 < 0 || self.x + 50 > canvas.width) {
                self.xInertia *= -1;
            }
            if (self.y - 50 < 0 || self.y + 50 > canvas.height) {
                self.yInertia *= -1;
            }
            self.x += self.xInertia;
            self.y += self.yInertia;
        };

        self.render = function (ctx) {
            ctx.beginPath();
            ctx.arc(self.x, self.y, 50, 0, 2 * Math.PI, false);
            ctx.fillStyle = color;
            ctx.fill();
            ctx.lineWidth = 5;
            ctx.strokeStyle = '#003300';
            ctx.stroke();
        };
    };

    // Define a stage.
    var container = document.getElementById('container');
    var stage = new JEngine.Stage(container);
    stage.addActor(new Actor('Red'));
    stage.addActor(new Actor('Blue'));
    stage.addActor(new Actor('Green'));
    stage.addActor(new Actor('Yellow'));
    stage.addActor(new Actor('Orange'));
    stage.addActor(new Actor('Purple'));
    stage.start();

    document.getElementById("toggle").addEventListener('click', function () {
        if (stage.isStarted()) {
            stage.stop();
        }
        else {
            stage.start();
        }
    });
});
