define([
    'src/util/Iterator',
    'src/geometry/Point',
    'src/geometry/Vector'
], function (Iterator, Point, Vector) {
    'use strict';

    return function (vertexCount, radius) {
        var self = this;
        var _vertices = [];

        Object.defineProperty(self, "vertices", {
            get: function () {
                return _vertices;
            }
        });

        Object.defineProperty(self, "width", {
            get: function () {
                var min = null;
                var max = null;
                Iterator.each(_vertices, function (vertice) {
                    if (vertice.x < min || min === null) {
                        min = vertice.x;
                    }
                    if (vertice.x > max || max === null) {
                        max = vertice.x;
                    }
                });
                return max - min;
            }
        });

        Object.defineProperty(self, "height", {
            get: function () {
                var min = null;
                var max = null;
                Iterator.each(_vertices, function (vertice) {
                    if (vertice.y < min || min === null) {
                        min = vertice.y;
                    }
                    if (vertice.y > max || max === null) {
                        max = vertice.y;
                    }
                });
                return max - min;
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
         * Determines if a Point lies within the bounds of a convex Polygon.
         * @param point
         */
        self.contains = function (point) {
            var sum = 0;
            for (var i = 0; i < _vertices.length; i++) {
                var vertex = _vertices[i];
                var nextVertex = i + 1 < _vertices.length ? _vertices[i + 1] : _vertices[0];
                var a = point.distanceTo(nextVertex);
                var b = point.distanceTo(vertex);
                var c = vertex.distanceTo(nextVertex);

                // Algebraic manipulation of the law of cosines.
                sum += Math.acos((Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b));
            }

            // If all the angles add up to exactly a full circle, the point is within the Polygon.
            return sum === Math.PI * 2;
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
                Iterator.each(polygon.vertices, function (vertex, index, vertices) {
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
                    if (max === null || p > max) {
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

        /**
         * The constructor can initialize the Polygon to any regular n-gon automatically. If the constructor parameters
         * are omitted, vertexes can still be added individually.
         */
        if (vertexCount && radius) {
            var radians = (2 * Math.PI) / vertexCount;
            for (var i = 0; i < vertexCount; i++)
            {
                _vertices.push(new Point(
                    radius + radius * Math.sin(i * radians),
                    radius + radius * Math.cos(i * radians)
                ));
            }
        }
    };
});
