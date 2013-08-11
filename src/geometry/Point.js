define([], function () {
    'use strict';

    var Point = function (x, y) {
        var self = this;
        var _x = x ? x : 0;
        var _y = y ? y : 0;

        Object.defineProperty(self, "x", {
            get: function () {
                return _x;
            },
            set: function (x) {
                _x = x;
            }
        });

        Object.defineProperty(self, "y", {
            get: function () {
                return _y;
            },
            set: function (y) {
                _y = y;
            }
        });

        self.transform = function (matrix) {
            return new Point (
                (matrix.a * _x) + (matrix.c * _y) + matrix.e,
                (matrix.b * _x) + (matrix.d * _y) + matrix.f
            );
        };
    };

    return Point;
});
