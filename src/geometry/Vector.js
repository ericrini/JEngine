define([], function () {
    'use strict';

    var getAngle = function (x, y) {
        return Math.atan2(y, x);
    };

    var getMagnitude = function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    var getComponentX = function (angle, magnitude) {
        return Math.cos(angle) * magnitude;
    };

    var getComponentY = function (angle, magnitude) {
        return Math.sin(angle) * magnitude;
    };

    return function (inX, inY) {
        var self = this;
        var x = inX ? inX : 0;
        var y = inY ? inY : 0;
        var angle = getAngle(x, y); // This value is always in radians.
        var magnitude = getMagnitude(x, y);

        Object.defineProperty(self, "x", {
            get: function () {
                return x;
            },
            set: function (inX) {
                x = inX;
                angle = getAngle(x, y);
                magnitude = getMagnitude(x, y);
            }
        });

        Object.defineProperty(self, "y", {
            get: function () {
                return y;
            },
            set: function (inY) {
                y = inY;
                angle = getAngle(x, y);
                magnitude = getMagnitude(x, y);
            }
        });

        Object.defineProperty(self, "magnitude", {
            get: function () {
                return magnitude;
            },
            set: function (inMagnitude) {
                magnitude = inMagnitude;
                x = getComponentX(angle, magnitude);
                y = getComponentY(angle, magnitude);
            }
        });

        Object.defineProperty(self, "angle", {
            get: function () {
                return angle * (180 / Math.PI); // Convert to degrees.
            },
            set: function (inAngle) {
                angle = (180 / Math.PI) / inAngle; // Convert to radians.
                x = getComponentX(angle, magnitude);
                y = getComponentY(angle, magnitude);
            }
        });
    };
});
