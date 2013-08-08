define([
    'src/JEngine'
], function (JEngine) {
    'use strict';

    describe('The JEngine', function () {
        it('exposes an Observable constructor.', function () {
            expect(JEngine.Observable).toBeDefined();
        });
    });
});
