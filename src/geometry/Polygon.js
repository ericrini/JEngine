define([
    'src/util/Iterator',
    'src/geometry/Point',
    'src/geometry/Vector'
], function (Iterator, Point, Vector) {
    'use strict';

    return function () {
        var self = this;
        var _vertices = [];

        Object.defineProperty(self, "vertices", {
            get: function () {
                return _vertices;
            }
        });

        self.addVertex = function (x, y) {
            _vertices.push(new Point(x, y));
        };

        self.transform = function (matrix) {
            Iterator.each(_vertices, function (vertex, index) {
                _vertices[index] = vertex.transform(matrix);
            });
        };

        /**
         * Finds the minimum translation vector to separate two intersected Polygons.
         * @param polygon
         * @returns {Vector} The MTV if the Polygons intersect or null if they do not.
         */
        self.intersects = function (polygon) {

            // An array of Vectors such that each Vector is perpendicular to a side of the Polygon.
            var getAxes = function (polygon) {
                var axes = [];
                Iterator.each(_vertices, function (vertex, index, vertices) {
                    var currentVector = new Vector(vertex.x, vertex.y);
                    var nextVertex = vertices[index + 1] ? vertices[index + 1] : vertices[0];
                    var nextVector = new Vector(nextVertex.x, nextVertex.y);
                    var edgeVector = currentVector.getDifference(nextVector);
                    var normalVector = edgeVector.getNormalVector();
                    normalVector.magnitude = 1;
                    axes.push(normalVector);
                });
                return axes;
            };

            // Project all the vertices of a Polygon into a Vector.
            var projectPolygonIntoAxis = function (polygon, axis) {
                var min = null;
                var max = null;
                Iterator.each(polygon.vertices, function (vertice) {
                    var p = axis.getDotProduct(new Vector(vertice.x, vertice.y));
                    if (min === null || p < min) {
                        min = p;
                    }
                    else if (max === null || p > max) {
                        max = p;
                    }
                });
                return {
                    min: min,
                    max: max
                };
            };

            // Returns true if one projection overlaps another.
            var overlap = function(left, right) {
                if (left.min > right.max || right.min > left.max) {
                    return 0;
                }
                else if (left.min < right.min) {
                    return left.max - right.min;
                }
                else {
                    return right.max - left.min;
                }
            };

            // Get all the separating axes of both Polygons.
            var axes = [];
            axes = axes.concat(getAxes(self));
            axes = axes.concat(getAxes(polygon));

            // Project each Polygons vertices into each axis.
            var mtv = null;
            for (var i = 0; i < axes.length; i++) {
                var axis = axes[i];
                var left = projectPolygonIntoAxis(self, axis);
                var right = projectPolygonIntoAxis(polygon, axis);

                // Get the overlap on this axis.
                var overlapSize = overlap(left, right);
                if (overlapSize === 0) {

                    // If any axis doesn't overlap, the Polygons do not intersect.
                    // Note that this tremendously improves the average case performance of this algorithm.
                    return null;
                }
                else if (mtv === null || overlapSize < mtv.magnitude) {

                    // Track the least penetrated axis.
                    // This becomes the minimum translation vector to resolve the collision.
                    mtv = new Vector(axis.x, axis.y);
                    mtv.magnitude = overlapSize;
                }
            }

            // This indicates not only that a collision happens, but the minimum vector to translate this Polygon to
            // move it out of collision. This is insanely useful for game logic.
            return mtv;
        };
    };
});
