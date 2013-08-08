define([
    'src/util/Inheritance',
    'src/ActorManager'
], function (Inheritance, ActorManager) {
    'use strict';

    return function (container, options) {
        options = Inheritance.extend({
            style: {
                background: '#ddd',
                border: '1px solid Black',
                height: 480,
                width: 640
            },
            targetFps: 60
        }, options);

        var CONTEXT = '2d';

        var self = this;
        var canvas;
        var context;
        var frame;
        var actorManager = new ActorManager(self);

        var createCanvas = function () {
            canvas = document.createElement('canvas');
            canvas.setAttribute('height', options.style.height);
            canvas.setAttribute('width', options.style.width);
            canvas.style.background = options.style.background;
            canvas.style.border = options.style.border;
            container.appendChild(canvas);
            return canvas;
        };

        var initialize = function () {
            canvas = createCanvas();
            context = canvas.getContext(CONTEXT);
        };
        initialize();

        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        var requestAnimFrame = (function(){
            return window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                function( callback ){
                    window.setTimeout(callback, 1000 / 60);
                };
        })();

        // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
        var cancelAnimFrame = (function(){
            return window.cancelAnimationFrame ||
                window.cancelAnimationFrame ||
                window.cancelAnimationFrame ||
                function(timeout){
                    window.clearTimeout(timeout);
                };
        })();

        var loop = function () {
            actorManager.update(canvas);
            context.clearRect(0, 0, canvas.width, canvas.height);
            actorManager.render(context);
            frame = requestAnimFrame(loop);
        };

        self.start = function () {
            loop();
        };

        self.stop = function () {
            cancelAnimFrame(frame);
            frame = undefined;
        };

        self.isStarted = function () {
            return frame ? true : false;
        };

        self.getCanvas = function () {
            return canvas;
        };

        self.addActor = actorManager.addActor;
    };
});