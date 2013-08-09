define([], function () {
    'use strict';

    var Point = function (inX, inY) {
        var self = this;
        var x = inX ? inX : 0;
        var y = inY ? inY : 0;

        Object.defineProperty(self, "x", {
            get: function () {
                return x;
            },
            set: function (inX) {
                x = inX;
            }
        });

        Object.defineProperty(self, "y", {
            get: function () {
                return y;
            },
            set: function (inY) {
                y = inY;
            }
        });

        self.transform = function (inMatrix) {
            return new Point (
                (inMatrix.a * x) + (inMatrix.c * y) + inMatrix.e,
                (inMatrix.b * x) + (inMatrix.d * y) + inMatrix.f
            );
        };
    };

    return Point;
});
