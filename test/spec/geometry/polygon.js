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

            expect(poly1.intersects(poly2)).toBe(true);
            expect(poly1.intersects(poly3)).toBe(false);
            expect(poly2.intersects(poly1)).toBe(true);
            expect(poly2.intersects(poly3)).toBe(true);
            expect(poly3.intersects(poly1)).toBe(false);
            expect(poly3.intersects(poly2)).toBe(true);
        });
    });
});
