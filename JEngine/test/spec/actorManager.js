define([
    'src/ActorManager'
], function (ActorManager) {
    'use strict';

    describe('The ActorManager', function () {
        var init;
        var update;
        var render;
        var actor;
        var actorManager;

        beforeEach(function() {
            init = 0;
            update = 0;
            render = 0;
            actor = {
                init: function () {
                    init++;
                },
                update: function () {
                    update++;
                },
                render: function () {
                    render++;
                }
            };
            actorManager = new ActorManager({
                getCanvas: function () {
                    return {};
                }
            });
            actorManager.addActor(actor);
            actorManager.addActor(actor);
            actorManager.addActor(actor);
            actorManager.update();
            actorManager.render();
            actorManager.update();
            actorManager.render();
            actorManager.update();
            actorManager.render();
        });

        it('will intialize new actors.', function () {
            expect(init).toBe(3);
        });

        it('will perform an update on each actor when it is updated.', function () {
            expect(update).toBe(9);
        });

        it('will perform a render on each actor when it is rendered.', function () {
            expect(render).toBe(9);
        });
    });
});
