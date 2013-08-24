define([], function () {
    'use strict';

    var Matrix = function (a, b, c, d, e, f) {
        var self = this;
        var _a = a ? a : 1;
        var _b = b ? b : 0;
        var _c = c ? c : 0;
        var _d = d ? d : 1;
        var _e = e ? e : 0;
        var _f = f ? f : 0;

        Object.defineProperty(self, "a", {
            get: function () {
                return _a;
            }
        });

        Object.defineProperty(self, "b", {
            get: function () {
                return _b;
            }
        });

        Object.defineProperty(self, "c", {
            get: function () {
                return _c;
            }
        });

        Object.defineProperty(self, "d", {
            get: function () {
                return _d;
            }
        });

        Object.defineProperty(self, "e", {
            get: function () {
                return _e;
            }
        });

        Object.defineProperty(self, "f", {
            get: function () {
                return _f;
            }
        });

        self.getProduct = function (inMatrix) {
            return new Matrix(
                (_a * inMatrix.a) + (_c * inMatrix.b),
                (_b * inMatrix.a) + (_d * inMatrix.b),
                (_a * inMatrix.c) + (_c * inMatrix.d),
                (_b * inMatrix.c) + (_d * inMatrix.d),
                (_a * inMatrix.e) + (_c * inMatrix.f) + _e,
                (_b * inMatrix.e) + (_d * inMatrix.f) + _f
            );
        };
    };

    return Matrix;
});