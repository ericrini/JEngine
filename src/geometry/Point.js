define([], function () {
    'use strict';

    var Point = function (x, y) {
        var self = this;
        var _x = x ? x : 0;
        var _y = y ? y : 0;

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

        /**
         * Finds the distance between this Point and another Point.
         * @param point
         * @returns {number}
         */
        self.distanceTo = function (point) {
            return Math.sqrt(Math.pow(point.x - _x, 2) + Math.pow(point.y - _y, 2));
        };

        self.transform = function (matrix) {
            return new Point (
                (matrix.a * _x) + (matrix.c * _y) + matrix.e,
                (matrix.b * _x) + (matrix.d * _y) + matrix.f
            );
        };
    };

    return Point;
});
