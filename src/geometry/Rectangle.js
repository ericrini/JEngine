define([
    'src/geometry/point'
], function (Point) {
    'use strict';

    var Rectangle = function (x, y, width, height) {
        var self = this;
        var _x = x;
        var _y = y;
        var _width = width;
        var _height = height;

        Object.defineProperty(self, "x", {
            get: function () {
                return _x;
            }
        });

        Object.defineProperty(self, "y", {
            get: function () {
                return _y;
            }
        });

        Object.defineProperty(self, "width", {
            get: function () {
                return _width;
            }
        });

        Object.defineProperty(self, "height", {
            get: function () {
                return _height;
            }
        });

        self.contains = function (point) {
            return point.x > _x && point.x < (_x + _width) &&
                point.y > _y && point.y < (_y + _height);
        };

        self.intersects = function (rectangle) {
            var p1 = new Point(_x, _y);
            var p2 = new Point(_x + _width, _y + _height);
            var p3 = new Point(rectangle.x, rectangle.y);
            var p4 = new Point(rectangle.x + rectangle.width, rectangle.y + rectangle.height);
            return !( p2.y < p3.y || p1.y > p4.y || p2.x < p3.x || p1.x > p4.x );
        };
    };

    return Rectangle;
});