module.exports = function(grunt) {
    'use strict';

    // Initialize Task Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ['build/*', 'doc/*'],
        jshint: {
            all: ['gruntfile.js', 'package.json', '.jshintrc', 'src/*.js', 'test/main.js', 'test/spec/*.js']
        },
        jsdoc : {
            dist : {
                src: ['src/*'],
                options: {
                    destination: 'doc'
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    baseUrl: '.',
                    include: ['src/JEngine'],
                    insertRequire: ['src/JEngine'],
                    name: 'lib/almond/almond',
                    optimize: 'none',
                    out: 'build/JEngine.min.js'
                }
            }
        },
        connect: {
            server: {
                options: {
                    base: '.',
                    hostname: '*',
                    keepalive: true,
                    port: 9001
                }
            }
        }
    });

    // Load Tasks
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-connect');

    // Register Tasks
    grunt.registerTask('default', ['jshint', 'clean', 'jsdoc', 'requirejs', 'connect']);
    grunt.registerTask('build', ['jshint', 'clean', 'jsdoc', 'requirejs']);
};
