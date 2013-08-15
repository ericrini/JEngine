define([
    'src/geometry/Matrix',
    'src/geometry/Polygon'
], function (Matrix, Polygon) {
    'use strict';

    return function () {
        var self = this;
        var _matrix = new Matrix();
        var _collisionRegion = new Polygon();

        self.drawCollisionRegion = false;

        Object.defineProperties(self, "matrix", {
            get: function () {
                return _matrix;
            }
        });

        Object.defineProperties(self, "collisionRegion", {
            get: function () {
                return _collisionRegion;
            }
        });

        self.init = function () {
        };

        self.onInit = function () {

        }

        self.update = function () {
        };

        self.onUpdate = function () {

        }

        self.render = function () {
        };
    };
});
