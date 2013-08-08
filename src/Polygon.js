define([
    'src/util/Iterator'
], function (Iterator) {
    'use strict';

    return function () {
        var self = this;

        self.vertices = [];

        self.addEdge = function (x1, y1, x2, y2) {
            // TODO: Validate we are not compromising the regularity of the polygon.
            self.vertices.push({ x: x1, y: y1 });
            self.vertices.push({ x: x2, y: y2 });
        };

        self.close = function () {
            if (self.vertices.length > 2) {
                self.vertices.push(self.vertices[0]);
            }
        };

        // http://www.codezealot.org/archives/55#sat-convex
        self.checkCollision = function (other) {

        };

        var getAxes = function () {

        };

        var getAxisNormals = function () {

        };
    };
});
