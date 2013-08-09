define([], function () {
    'use strict';

    var Matrix = function (inA, inB, inC, inD, inE, inF) {
        var self = this;
        var a = inA ? inA : 1;
        var b = inB ? inB : 0;
        var c = inC ? inC : 0;
        var d = inD ? inD : 1;
        var e = inE ? inE : 0;
        var f = inF ? inF : 0;

        Object.defineProperty(self, "a", {
            get: function () {
                return a;
            },
            set: function (inA) {
                a = inA;
            }
        });

        Object.defineProperty(self, "b", {
            get: function () {
                return b;
            },
            set: function (inB) {
                b = inB;
            }
        });

        Object.defineProperty(self, "c", {
            get: function () {
                return c;
            },
            set: function (inC) {
                c = inC;
            }
        });

        Object.defineProperty(self, "d", {
            get: function () {
                return d;
            },
            set: function (inD) {
                d = inD;
            }
        });

        Object.defineProperty(self, "e", {
            get: function () {
                return e;
            },
            set: function (inE) {
                e = inE;
            }
        });

        Object.defineProperty(self, "f", {
            get: function () {
                return f;
            },
            set: function (inF) {
                f = inF;
            }
        });

        self.getProduct = function (inMatrix) {
            return new Matrix(
                (a * inMatrix.a) + (c * inMatrix.b),
                (b * inMatrix.a) + (d * inMatrix.b),
                (a * inMatrix.c) + (c * inMatrix.d),
                (b * inMatrix.c) + (d * inMatrix.d),
                (a * inMatrix.e) + (c * inMatrix.f) + e,
                (b * inMatrix.e) + (d * inMatrix.f) + f
            );
        };
    };

    return Matrix;
});