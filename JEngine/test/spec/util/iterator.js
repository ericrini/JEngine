define([
    'src/util/Iterator'
], function (Iterator) {
    'use strict';

    describe('The Iterator utilities', function () {
        var array;

        beforeEach(function () {
            array = [
                {
                    "id": 1,
                    "description": "apple"
                },
                {
                    "id": 2,
                    "description": "orange"
                },
                {
                    "id": 3,
                    "description": "pear"
                }
            ]
        });

        it('can find an element in an array.', function () {
            var found;
            found = Iterator.find(array, function (element) {
                return element.id === 2;
            });
            expect(found).toBe(array[1]);
            found = Iterator.find(array, function (element) {
                return element.id === 4;
            });
            expect(found).toBe(false);
        });

        it('can iterate all elements in an array.', function () {
            var count = 0;
            Iterator.each(array, function(element, index, source) {
                expect(element.id).toBe(count + 1);
                expect(index).toBe(count);
                expect(source).toBe(array);
                count++;
            });
        });
    });
});
