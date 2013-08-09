define([
    'src/geometry/matrix'
], function (Matrix) {
    'use strict';

    describe('A Matrix', function () {
        it('can be constructed', function () {
            var m1 = new Matrix();
            expect(m1.a).toBe(1);
            expect(m1.b).toBe(0);
            expect(m1.c).toBe(0);
            expect(m1.d).toBe(1);
            expect(m1.e).toBe(0);
            expect(m1.f).toBe(0);

            var m2 = new Matrix(1, 2, 3, 4, 5, 6);
            expect(m2.a).toBe(1);
            expect(m2.b).toBe(2);
            expect(m2.c).toBe(3);
            expect(m2.d).toBe(4);
            expect(m2.e).toBe(5);
            expect(m2.f).toBe(6);
        });

        it('can be multiplied by another matrix', function () {
            var m1 = new Matrix(4, 3, 2, 3, 5, 9);
            var m2 = new Matrix(6, 2, 7, 3, 8, 2);
            var m3 = m1.getProduct(m2);
            expect(m3.a).toBe(28);
            expect(m3.b).toBe(24);
            expect(m3.c).toBe(34);
            expect(m3.d).toBe(30);
            expect(m3.e).toBe(41);
            expect(m3.f).toBe(39);
        });
    })
});
