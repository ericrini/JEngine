define([
    'src/util/Inheritance'
], function (Inheritance) {
    'use strict';

    describe('The inheritance utilities', function () {
        var o1;
        var o2;
        var o3;
        var array;
        var f1;
        var f2;
        var f3;
        var object;

        beforeEach(function () {
            o1 = { "description": "Item 1" };
            o2 = { "description": "Item 2" };
            o3 = { "description": "Item 3" };
            f1 = function () {
                return "f1";
            };
            f2 = function () {
                return "f2";
            };
            f3 = function () {
                return "f3";
            };
            object = {
                "number": 1,
                "string": "foobar",
                "boolean": true,
                "null": null,
                "function": f1,
                "array": [o1, o2, o3],
                "object": {
                    "number": 2,
                    "string": "foobar",
                    "boolean": true,
                    "null": null,
                    "function": f2,
                    "array": [o1, o2, o3],
                    "object": {
                        "number": 3,
                        "string": "foobar",
                        "boolean": true,
                        "null": null,
                        "function": f3,
                        "array": [o1, o2, o3]
                    }
                }
            };
        });

        it('can create a deep clone of an object.', function () {
            var output = Inheritance.extend({}, object);
        });

        it('can use a duck punching technique to extend an object.', function () {
            var output = Inheritance.extend(object, {
                "string": "barbaz",
                "object": {
                    "null": "notnull",
                    "array": [o2],
                    "object": {
                        "number": 4,
                        "boolean": false,
                        "function": function () {
                            return "f4";
                        }
                    }
                }
            });
            expect(output.number).toBe(1);
            expect(output.string).toBe("barbaz");
            expect(output.boolean).toBe(true);
            expect(output.null).toBe(null);
            expect(output.function()).toBe("f1");
            expect(output.array[0]).toBe(o1);
            expect(output.array[2]).toBe(o3);
            expect(output.array[1]).toBe(o2);
            expect(output.object.number).toBe(2);
            expect(output.object.string).toBe("foobar");
            expect(output.object.boolean).toBe(true);
            expect(output.object.null).toBe("notnull");
            expect(output.object.function()).toBe("f2");
            expect(output.object.array[1]).toBe(o1);
            expect(output.object.array[0]).toBe(o3);
            expect(output.object.object.number).toBe(4);
            expect(output.object.object.string).toBe("foobar");
            expect(output.object.object.boolean).toBe(false);
            expect(output.object.object.null).toBe(null);
            expect(output.object.object.function()).toBe("f4");
            expect(output.object.object.array[1]).toBe(o2);
            expect(output.object.object.array[0]).toBe(o1);
            expect(output.object.object.array[2]).toBe(o3);
        });
    });
});
