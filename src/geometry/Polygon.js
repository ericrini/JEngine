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

        self.intersects = function (other) {

            // An array of Vectors such that each Vector is perpendicular to a side of the Polygon.
            var getAxes = function (polygon) {
                var axes = [];
                Iterator.each(_vertices, function (vertex, index, vertices) {
                    var currentVector = new Vector(vertex.x, vertex.y);
                    var nextVertex = vertices[index + 1] ? vertices[index + 1] : vertices[0];
                    var nextVector = new Vector(nextVertex.x, nextVertex.y);
                    var edgeVector = currentVector.getDifference(nextVector);
                    axes.push(edgeVector.getNormalVector());
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
            var overlap = function(projection1, projection2) {
                return (projection1.min > projection2.min && projection1.min < projection2.max) ||
                    (projection1.max < projection2.max && projection1.max > projection2.min);
            };

            // Get all the axes of both Polygons.
            var axes = [];
            axes = axes.concat(getAxes(self));
            axes = axes.concat(getAxes(other));

            // If we can find an axis where an overlap doesn't occur, then the polygons don't intersect.
            var nonOverlappingAxis = Iterator.find(axes, function (axis) {
                var projection1 = projectPolygonIntoAxis(self, axis);
                var projection2 = projectPolygonIntoAxis(other, axis);
                return !overlap(projection1, projection2);
            });

            if (nonOverlappingAxis) {
                return false;
            }
            return true;
        };
    };
});
