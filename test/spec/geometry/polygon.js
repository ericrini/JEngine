define([
    'src/geometry/Polygon'
], function (Polygon) {
    'use strict';

    describe('The Polygon', function () {
        it('can be transformed by a Matrix', function () {

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
