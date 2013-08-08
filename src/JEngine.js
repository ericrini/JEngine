/**
 * @license
 * JEngine 1.0
 * Copyright Eric Rini
 */
define([
    'src/Observable',
    'src/Stage',
    'src/ActorManager',
    'src/Actor'
], function (Observable, Stage, ActorManager, Actor) {
    'use strict';

    return {
        Observable: Observable,
        Stage: Stage,
        ActorManager: ActorManager,
        Actor: Actor
    };
});
