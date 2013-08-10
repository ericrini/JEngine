define([
    'src/geometry/Vector'
], function (Vector) {
    'use strict';

    describe('A Vector', function () {

        beforeEach(function () {
            this.addMatchers({
                toBeApprox: function (expected) {
                    return Math.round(this.actual * 1000) / 1000 === expected; // Round to 3 decimal places.
                }
            });
        });

        it('has a constructor', function () {
            var v1 = new Vector();
            expect(v1.x).toBe(0);
            expect(v1.y).toBe(0);
            expect(v1.angle).toBeApprox(0);
            expect(v1.magnitude).toBeApprox(0);

            var v2 = new Vector(3, 4);
            expect(v2.x).toBe(3);
            expect(v2.y).toBe(4);
            expect(v2.angle).toBeApprox(53.130);
            expect(v2.magnitude).toBe(5);
        });

        it('maintains a correct state after changing the x or y component', function () {
            var v1 = new Vector(2, 8);
            v1.x = 3;
            expect(v1.x).toBe(3);
            expect(v1.y).toBe(8);
            expect(v1.angle).toBeApprox(69.444);
            expect(v1.magnitude).toBeApprox(8.544);
            v1.y = -2;
            expect(v1.x).toBe(3);
            expect(v1.y).toBe(-2);
            expect(v1.angle).toBeApprox(-33.690);
            expect(v1.magnitude).toBeApprox(3.606);
        });

        it('maintains a correct state after changing the magnitude', function () {
            var v1 = new Vector(-2, 6);
            v1.magnitude = 3;
            expect(v1.magnitude).toBe(3);
            expect(v1.angle).toBeApprox(108.435);
            expect(v1.x).toBeApprox(-0.949);
            expect(v1.y).toBeApprox(2.846);
        });

        it('maintains a correct state after changing the angle', function () {
            var v1 = new Vector(4, 2);
            v1.angle = 45;
            expect(v1.magnitude).toBeApprox(4.472);
            expect(v1.angle).toBe(45);
            expect(v1.x).toBeApprox(3.162);
            expect(v1.y).toBeApprox(3.162);
        });

        it('can find the sum of itself and another Vector', function () {
            var v1 = new Vector(6, 4);
            var v2 = new Vector(2, 7);
            var v3 = v1.getSum(v2);
            expect(v3.x).toBe(8);
            expect(v3.y).toBe(11);
            expect(v3.magnitude).toBeApprox(13.601);
            expect(v3.angle).toBeApprox(53.973);
        });

        it('can find the difference between itself and another Vector', function () {
            var v1 = new Vector(6, 4);
            var v2 = new Vector(2, 7);
            var v3 = v1.getDifference(v2);
            expect(v3.x).toBe(4);
            expect(v3.y).toBe(-3);
            expect(v3.magnitude).toBe(5);
            expect(v3.angle).toBeApprox(-36.87);
        });

        it('can find the dot product of itself and another Vector', function () {
            var v1 = new Vector(6, 4);
            var v2 = new Vector(2, 7);
            var v3 = v1.getDifference(v2);
            expect(v3.x).toBe(4);
            expect(v3.y).toBe(-3);
            expect(v3.magnitude).toBe(5);
            expect(v3.angle).toBeApprox(-36.87);
        });

        it('can find the normal Vector of itself', function () {
            var v1 = new Vector(6, 4);
            var v2 = new Vector(2, 7);
            expect(v1.getDotProduct(v2)).toBe(40);
        });
    });
});
