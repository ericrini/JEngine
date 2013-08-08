define([], function () {
    'use strict';

    var extendRecursive = function (o1, o2) {
        for (var property in o2) {
            if (o2.hasOwnProperty(property)) {
                if (o2[property] instanceof Function) {
                    o1[property] = o2[property];
                }
                else if (o2[property] instanceof Array) {
                    o1[property] = o2[property];
                }
                else if (o2[property] instanceof Object) {
                    extendRecursive(o1[property], o2[property]);
                }
                else {
                    o1[property] = o2[property];
                }
            }
        }
        return o1;
    };

    return {
        clone: function () {

        },
        extend: function (o1, o2) {
            return extendRecursive(o1, o2);
        }
    };
});
