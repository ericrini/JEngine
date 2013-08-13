define([
    'src/geometry/Point'
], function (Point) {
    'use strict';

    describe('A Point', function () {
        it('has a constructor', function () {
            var point = new Point();
            expect(point.x).toBe(0);
            expect(point.y).toBe(0);

            var point2 = new Point(1, 2);
            expect(point2.x).toBe(1);
            expect(point2.y).toBe(2);
        });

        it('can find the distance between itself and another Point', function () {
            var p1 = new Point(-2, 1);
            var p2 = new Point(1, 5);
            expect(p1.distanceTo(p2)).toBe(5);
        });

        it('can be transformed', function () {
            var p1 = new Point(2, 3);

            var p2 = p1.transform({ a: 1, b: 0, c: 0, d: 1, e: 0, f: 0 });
            expect(p1.x).toBe(2);
            expect(p1.y).toBe(3);
            expect(p2.x).toBe(2);
            expect(p2.y).toBe(3);

            var p3 = p1.transform({ a: 1, b: 0, c: 0, d: 1, e: 3, f: 6 });
            expect(p3.x).toBe(5);
            expect(p3.y).toBe(9);
        });
    });
});
