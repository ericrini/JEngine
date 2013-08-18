define([
    'src/ActorManager'
], function (ActorManager) {
    'use strict';

    describe('The ActorManager', function () {
        var actorManager;

        beforeEach(function() {
            actorManager = new ActorManager({
                canvas: function () {
                    return {
                        height: 640,
                        width: 480,
                        addEventListener: function () {}
                    };
                }
            });
        });

        it('will correctly initialize new Actors', function () {
            var count = 0;
            var actor = {
                init: function (event) {
                    expect(event).toBeDefined();
                    count++;
                }
            };
            actorManager.addActor(actor);
            actorManager.addActor(actor);
            expect(count).toBe(2);
        });

        it('will correctly update Actors', function () {
        });

        it('will correctly render Actors', function () {
        });

        it('will correctly trigger collision events', function () {
        });
    });
});
