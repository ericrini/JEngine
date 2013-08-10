define([], function () {
    'use strict';

    return {
        extend: function (o1, o2) {
            for (var property in o1) {
                if (o2[property]) {
                    o1[property] = o2[property];
                }
            }
        }
    };
});
