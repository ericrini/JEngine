define([
    'src/geometry/Matrix',
    'src/geometry/Polygon'
], function (Matrix, Polygon) {
    'use strict';

    return function (strategy, bounds, options) {
        var self = this;
        var _options = options ? options : {
            drawBounds: false
        };
        var _matrix = new Matrix();
        var _bounds = bounds ? bounds : new Polygon();
        var _transformedBounds = _bounds;
        var _strategy = strategy ? strategy : {};

        Object.defineProperties(self, "bounds", {
            get: function () {
                return _transformedBounds;
            }
        });

        Object.defineProperties(self, "width", {
            get: function () {
                return _bounds;
            }
        });

        Object.defineProperties(self, "height", {
            get: function () {
                return _bounds;
            }
        });

        self.init = function (event) {
            if (_strategy.init) {
                _strategy.init.call(self, event);
            }
        };

        self.update = function (event) {
            _transformedBounds = _bounds.transform(_matrix);
            if (_strategy.update) {
                _strategy.update.call(self, event);
            }
        };

        self.render = function (event) {
            if (_strategy.render) {
                _strategy.render.call(self, event);
            }

            // Draw the collision region of the Actor.
            if (options.drawBounds) {
                event.context.beginPath();
                event.context.moveTo(_transformedBounds.vertices[0].x, _transformedBounds.vertices[0].y);
                Iterator.each(_transformedBounds.vertices, function (vertex, index, vertices) {
                    event.context.lineTo(vertex.x, vertex.y);
                });
                event.context.lineTo(_transformedBounds.vertices[0].x, _transformedBounds.vertices[0].y);
                event.context.strokeStyle = options.drawBounds;
                event.context.lineWidth = 1;
                event.context.stroke();
            }
        };

        self.collision = function () {
            if (_strategy.collision) {
                _strategy.collision.call(self, event);
            }
        };

        self.translate = function (tx, ty) {
            return self.getProduct(new Matrix(1, 0, 0, 1, tx, ty));
        };

        self.rotate = function (degrees, point) {
            var radians = (Math.PI / 180) * degrees;
            return self.getProduct(new Matrix(
                Math.cos(radians),
                Math.sin(radians) * -1,
                Math.sin(radians),
                Math.cos(radians)
            ));
        };

        self.scale = function (sx, sy) {
            return self.getProduct(new Matrix(sx, 0, 0, sy, 0, 0));
        };

        self.skew = function (sx, sy) {
            return self.getProduct(new Matrix(1, sy, sx, 1, 0, 0));
        };

        self.mirrorVertical = function () {
            return self.getProduct(new Matrix(1, 0, 0, -1, 0, 0));
        };

        self.mirrorHorizontal = function () {
            return self.getProduct(new Matrix(-1, 0, 0, 1, 0, 0));
        };
    };
});