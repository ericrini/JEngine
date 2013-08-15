define([
    'src/geometry/Polygon',
    'src/geometry/Point'
], function (Polygon, Point) {
    'use strict';

    describe('The Polygon', function () {
        it('can be constructed', function () {
            var poly;

            poly = new Polygon();
            expect(poly).toBeDefined();
            expect(poly.vertices.length).toBe(0);

            poly = new Polygon(8, 100);
            expect(poly.vertices.length).toBe(8);
        });

        it('can determine its width and height', function () {
            var poly;

            poly = new Polygon();
            expect(poly.width).toBe(0);
            expect(poly.height).toBe(0);
            poly.addVertex(12, 0);
            poly.addVertex(0, 14);
            poly.addVertex(17, 16);
            expect(poly.width).toBe(17);
            expect(poly.height).toBe(16);
        });

        it('can be transformed by a Matrix', function () {
            expect(true).toBe(false);
        });

        it ('can determine if a Point lies within its bounds', function () {
            var poly = new Polygon();
            poly.addVertex(0, 0);
            poly.addVertex(10, 0);
            poly.addVertex(10, 10);
            poly.addVertex(0, 10);

            var outside = new Point (11, 11);
            expect(poly.contains(outside)).toBe(false);

            var inside = new Point(5, 5);
            expect(poly.contains(inside)).toBe(true);
        });

        it('can find the minimum translation Vector required to separate itself from a Polygon it intersects with', function () {
            var poly1 = new Polygon();
            poly1.addVertex(0, 0);
            poly1.addVertex(100, 0);
            poly1.addVertex(100, 100);
            poly1.addVertex(0, 100);

            var poly2 = new Polygon();
            poly2.addVertex(50, 50);
            poly2.addVertex(150, 50);
            poly2.addVertex(150, 150);
            poly2.addVertex(50, 150);

            var poly3 = new Polygon();
            poly3.addVertex(100, 100);
            poly3.addVertex(200, 100);
            poly3.addVertex(200, 200);
            poly3.addVertex(100, 200);

            expect(poly1.intersects(poly3)).toBe(null);
            expect(poly3.intersects(poly1)).toBe(null);

            expect(poly1.intersects(poly2).magnitude).toBe(50);
            expect(poly1.intersects(poly2).x).toBe(50);
            expect(poly1.intersects(poly2).y).toBe(0);

            expect(poly2.intersects(poly1).magnitude).toBe(50);
            expect(poly2.intersects(poly1).x).toBe(50);
            expect(poly2.intersects(poly1).y).toBe(0);

            expect(poly2.intersects(poly3).magnitude).toBe(50);
            expect(poly2.intersects(poly3).x).toBe(50);
            expect(poly2.intersects(poly3).y).toBe(0);

            expect(poly3.intersects(poly2).magnitude).toBe(50);
            expect(poly3.intersects(poly2).x).toBe(50);
            expect(poly3.intersects(poly2).y).toBe(0);
        });
    });
});
