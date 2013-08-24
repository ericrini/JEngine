define([
    'src/geometry/Point',
    'src/geometry/Rectangle'
], function (Point, Rectangle) {
    'use strict';

    describe('A Rectangle', function () {
        it('has a constructor', function () {
            var rect = new Rectangle(0, 0, 100, 100);
            expect(rect).toBeDefined();
        });

        it('can detect if a point is inside it', function () {
            var p1 = new Point(50, 50);
            var p2 = new Point(150, 150);
            var rect = new Rectangle(0, 0, 100, 100);
            expect(rect.contains(p1)).toBe(true);
            expect(rect.contains(p2)).toBe(false);
        });

        it('can detect if two rectangles are in collision', function () {
            var r1 = new Rectangle(0, 0, 100, 100);
            var r2 = new Rectangle(50, 50, 100, 100);
            var r3 = new Rectangle(125, 125, 100, 100);
            expect(r1.intersects(r2)).toBe(true);
            expect(r1.intersects(r3)).toBe(false);
        });
    });
});