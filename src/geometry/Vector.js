define([], function () {
    'use strict';

    var getAngle = function (x, y) {
        return Math.atan2(y, x);
    };

    var getMagnitude = function (x, y) {
        return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    };

    var getHorizontalComponent = function (angle, magnitude) {
        return Math.cos(angle) * magnitude;
    };

    var getVerticalComponent = function (angle, magnitude) {
        return Math.sin(angle) * magnitude;
    };

    var Vector = function (x, y) {
        var self = this;
        var _x = x ? x : 0;
        var _y = y ? y : 0;
        var _angle = getAngle(_x, _y); // This value is always in radians.
        var _magnitude = getMagnitude(_x, _y);

        Object.defineProperty(self, "x", {
            get: function () {
                return _x;
            },
            set: function (x) {
                _x = x;
                _angle = getAngle(_x, _y);
                _magnitude = getMagnitude(_x, _y);
            }
        });

        Object.defineProperty(self, "y", {
            get: function () {
                return _y;
            },
            set: function (y) {
                _y = y;
                _angle = getAngle(_x, _y);
                _magnitude = getMagnitude(_x, _y);
            }
        });

        Object.defineProperty(self, "magnitude", {
            get: function () {
                return _magnitude;
            },
            set: function (magnitude) {
                _magnitude = magnitude;
                _x = getHorizontalComponent(_angle, _magnitude);
                _y = getVerticalComponent(_angle, _magnitude);
            }
        });

        Object.defineProperty(self, "angle", {
            get: function () {
                return _angle * (180 / Math.PI); // Convert to degrees.
            },
            set: function (degrees) {
                _angle = (degrees * Math.PI) / 180; // Convert to radians.
                _x = getHorizontalComponent(_angle, _magnitude);
                _y = getVerticalComponent(_angle, _magnitude);
            }
        });

        self.getSum = function (vector) {
            return new Vector(_x + vector.x, _y + vector.y);
        };

        self.getDifference = function (vector) {
            return new Vector(_x - vector.x, _y - vector.y);
        };

        self.getDotProduct = function (vector) {
            return (_x * vector.x) + (_y * vector.y);
        };

        self.getNormalVector = function () {
            return new Vector(-1 * _x, _y);
        };
    };

    return Vector;
});
