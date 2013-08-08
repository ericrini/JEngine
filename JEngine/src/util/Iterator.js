define([], function () {
    'use strict';

    /**
     * A static module containing useful Array utility functions.
     * @module Array
     */
    return {

        /**
         * Find an item in an Array using a strategy function.
         * @param array
         * @param strategy
         * @returns {boolean}
         */
        find: function (array, strategy) {
            for (var i = 0; i < array.length; i++) {
                if (strategy(array[i])) {
                    return array[i];
                }
            }
            return false;
        },

        /**
         * Loop through an array invoking a strategy function on each element.
         * @param array
         * @param strategy
         */
        each: function (array, strategy) {
            for (var i = 0; i < array.length; i++) {
                strategy(array[i], i, array);
            }
        }
    };
});
