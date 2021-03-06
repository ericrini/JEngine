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
            context: '2d'
        };
        var _self = this;
        var _canvas;
        var _context;
        var _actorManager;
        var _frameTimeout;

        Object.defineProperty(_self, 'canvas', {
            get: function () {
                return _canvas;
            }
        });

        Object.defineProperty(_self, 'actorManager', {
            get: function () {
                return _actorManager;
            }
        });

        _self.start = function () {
            var loop = function () {

                // http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
                var requestAnimFrame = (function(){
                    return window.requestAnimationFrame ||
                        window.webkitRequestAnimationFrame ||
                        window.mozRequestAnimationFrame ||
                        function(callback){
                            window.setTimeout(callback, 1000 / 60);
                        };
                })();

                _actorManager.update(_canvas);
                _context.clearRect(0, 0, _canvas.width, _canvas.height);
                _actorManager.render(_context);
                _frameTimeout = requestAnimFrame(loop);
            };

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

            cancelAnimFrame(_frameTimeout);
            _frameTimeout = undefined;
        };

        _self.isStarted = function () {
            return _frameTimeout ? true : false;
        };

        var init = function () {
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
            _actorManager = new ActorManager(_self);
        };
        init();
    };
});