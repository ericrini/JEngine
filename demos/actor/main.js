require.config({ baseUrl: '../../' });

define([
    'src/JEngine',
    'src/Actor'
], function (JEngine, Actor) {
    'use strict';

    // Define an actor.
    var actor = new Actor({});

    // Define a stage.
    var a1 = new Actor(215, 215, 3, 50, true, 'yellow');
    var a2 = new Actor(100, 100, 8, 75, false, 'blue');
    var a3 = new Actor(300, 300, 5, 75, false, 'blue');
    var container = document.getElementById('container');
    var stage = new JEngine.Stage(container);
    stage.actorManager.addActor(a3);
    stage.actorManager.addActor(a2);
    stage.actorManager.addActor(a1);
    stage.start();
});
