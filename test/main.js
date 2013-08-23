require.config({
    baseUrl: '../',
    shim: {
        'lib/jasmine/jasmine': {
            exports: 'jasmine'
        }
    }
});

define([
    'lib/jasmine/jasmine'
], function (jasmine) {
    'use strict';

    require([
        'test/spec/util/inheritance',
        'test/spec/util/iterator',
        'test/spec/geometry/point',
        'test/spec/geometry/vector',
        'test/spec/geometry/matrix',
        'test/spec/geometry/rectangle',
        'test/spec/geometry/polygon',
        'test/spec/observable',
        'test/spec/jengine',
        'lib/jasmine/jasmine-html'
    ], function () {
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 1000;

        var htmlReporter = new jasmine.HtmlReporter();

        jasmineEnv.addReporter(htmlReporter);

        jasmineEnv.specFilter = function(spec) {
            return htmlReporter.specFilter(spec);
        };

        jasmineEnv.execute();
    });
});