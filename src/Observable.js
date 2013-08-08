define([
    'src/util/Iterator'
], function (Iterator) {
    'use strict';

    return function (initialValue) {
        var self = this;
        var currentValue = initialValue;
        var observers = [];

        self.get = function () {
            return currentValue;
        };

        self.set = function (nextValue) {
            currentValue = nextValue;
            Iterator.each(observers, function (callback) {
                callback(currentValue);
            });
        };

        self.subscribe = function  (callback) {
            if (Iterator.find(observers, function (observer) {
                return observer === callback;
            })) {
                return;
            }
            if (typeof callback === "function") {
                observers.push(callback);
                callback(currentValue);
            }
        };

        self.unsubscribe = function (callback) {
            for (var i = 0; i < observers.length; i++) {
                if (observers[i] === callback) {
                    observers.splice(i, 1);
                    return true;
                }
            }
            return false;
        };
    };
});
