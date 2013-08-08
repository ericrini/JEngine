define([
    'src/Observable'
], function (Observable) {
    'use strict';

    describe('The Observable', function () {

        it('will notify subscribers if its value changes.', function () {
            var data = [];
            var observable = new Observable(100);
            expect(observable.get()).toBe(100);
            observable.subscribe(function (value) {
                data.push(value);
            });
            observable.set(200);
            expect(data[0]).toBe(100);
            expect(data[1]).toBe(200);
        });

        it('can unsubscribe a subscriber at any time.', function () {
            var data = [];
            var callback = function (value) {
                data.push(value);
            };
            var observable = new Observable(100);
            observable.subscribe(callback);
            observable.set(200);
            observable.unsubscribe(callback);
            observable.set(300);
            expect(data[0]).toBe(100);
            expect(data[1]).toBe(200);
            expect(data[2]).toBe(undefined);
        });

        it('will not allow duplicate subscriptions to occur.', function () {
            var data = [];
            var callback = function (value) {
                data.push(value);
            };
            var observable = new Observable("A");
            observable.subscribe(callback);
            observable.subscribe(callback);
            observable.set("B");
            observable.set("C");
            expect(data[0]).toBe("A");
            expect(data[1]).toBe("B");
            expect(data[2]).toBe("C");
        });
    });
});
