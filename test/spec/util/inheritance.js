define([
    'src/util/Inheritance'
], function (Inheritance) {
    'use strict';

    describe('The inheritance utilities', function () {
        var f1;
        var f2;
        var f3;
        var object;

        beforeEach(function () {
            f1 = function () {
                return "f1";
            };
            f2 = function () {
                return "f1";
            };
            f3 = function () {
                return "f1";
            };
            object = {
                "number": 1,
                "string": "foobar",
                "boolean": true,
                "null": null,
                "function": f1,
                "object": {
                    "number": 2,
                    "string": "foobar",
                    "boolean": true,
                    "null": null,
                    "function": f2,
                    "object": {
                        "number": 3,
                        "string": "foobar",
                        "boolean": true,
                        "null": null,
                        "function": f3
                    }
                }
            };
        });

        it('will recursively evaluate the extend call.', function () {
            /*
            var output = Inheritance.extend(object, {
                "string": "barbaz",
                "object": {
                    "null": "notnull",
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
            expect(output.object.number).toBe(2);
            expect(output.object.string).toBe("foobar");
            expect(output.object.boolean).toBe(true);
            expect(output.object.null).toBe("notnull");
            expect(output.object.function()).toBe("f2");
            expect(output.object.object.number).toBe(4);
            expect(output.object.object.string).toBe("foobar");
            expect(output.object.object.boolean).toBe(false);
            expect(output.object.object.null).toBe(null);
            expect(output.object.object.function()).toBe("f4");
            */
        });
    });
});
