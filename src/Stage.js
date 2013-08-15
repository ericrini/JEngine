define([
    'src/ActorManager'
], function (ActorManager) {
    'use strict';

    return function (container, options) {
        options = {
            style: {
                background: '#ddd',
                border: '1px solid Black',
                height: 480,
                width: 640
            },
            targetFps: 60,
            context: '2d'
        };
        var _self = this;
        var _canvas;
        var _context;
        var _frame;
        var _actorManager = new ActorManager(_self);

        var initialize = function () {
            var createCanvas = function () {
                _canvas = document.createElement('canvas');
                _canvas.setAttribute('height', options.style.height);
                _canvas.setAttribute('width', options.style.width);
                _canvas.style.background = options.style.background;
                _canvas.style.border = options.style.border;
                container.appendChild(_canvas);
                return _canvas;
            };
            _canvas = createCanvas();
            _context = _canvas.getContext(options.context);
        };
        initialize();

        var loop = function () {

            // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
            var requestAnimFrame = (function(){
                return window.requestAnimationFrame ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame ||
                    function( callback ){
                        window.setTimeout(callback, 1000 / 60);
                    };
            })();

            _actorManager.update(_canvas);
            _context.clearRect(0, 0, _canvas.width, _canvas.height);
            _actorManager.render(_context);
            _frame = requestAnimFrame(loop);
        };

        Object.defineProperty(_self, 'canvas', {
            get: function () {
                return _canvas;
            }
        });

        _self.start = function () {
            loop();
        };

        _self.stop = function () {

            // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
            var cancelAnimFrame = (function(){
                return window.cancelAnimationFrame ||
                    window.cancelAnimationFrame ||
                    window.cancelAnimationFrame ||
                    function(timeout){
                        window.clearTimeout(timeout);
                    };
            })();

            cancelAnimFrame(_frame);
            _frame = undefined;
        };

        _self.isStarted = function () {
            return _frame ? true : false;
        };

        _self.addActor = _actorManager.addActor;
    };
});