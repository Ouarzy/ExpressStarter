module.exports = function (grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        meta: {
            // Specify where our test files are.  Once we get all the tests switched over we can use 'test/js/**/*.spec.js' to automatically load all tests.
            specs: ['test/*.spec.js'],
            src: ['lib/*.js'],
            bin: {
                coverage: 'bin/coverage'
            }
        },
        // Our jasmine task, with a sub-task called 'test'.
        jasmine: {
            options: {
                specs: '<%= meta.specs %>',
            },
            test: {
                // Run with the default settings
            },
            coverage: {
                src: '<%= meta.src %>',
                options: {
                    specs: '<%= meta.specs %>',
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '<%= meta.bin.coverage %>/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: {
                                    dir: '<%= meta.bin.coverage %>/html'
                                }
                            },
                            {
                                type: 'cobertura',
                                options: {
                                    dir: '<%= meta.bin.coverage %>/cobertura'
                                }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    }
                }
            }
        },
        // Instrument the files for coverage
        instrument: {
            files: 'js/src/**/*.js',
            options: {
                basePath: '<%= meta.bin.coverage %>'
            }
        },
        storeCoverage: {
            options: {
                dir: '<%= meta.bin.coverage %>'
            }
        },
        makeReport: {
            src: '<%= meta.bin.coverage %>/*.json',
            options: {
                type: 'lcov',
                dir: '<%= meta.bin.coverage %>'
            }
        },
        // Setup a simple web server that can run our tests headlessly.
        connect: {
            options: {
                base: '.',
                port: 9911
            },
            test: {
                options: {
                    port: 9911,
                    keepalive: false
                }
            },
            runner: {
                options: {
                    port: 9912,
                    keepalive: false
                }
            }
        },
    });

    grunt.loadNpmTasks('grunt-istanbul');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-watch');

    /** Grunt Tasks **/

    // Instrument JS and run tests to get a coverage report
    grunt.registerTask('coverage', ['instrument', 'jasmine:coverage',
        'storeCoverage', 'makeReport']);

    // Run tests headlessly and report the results in the command line.
    grunt.registerTask('test', ['connect:test', 'jasmine:test']);

    // Start a simple web server and build the spec runner.
    // You can hit the spec runner in a browser after running this at 'http://localhost:9912/_SpecRunner.html
    grunt.registerTask('runner', ['jasmine:test:build', 'connect:runner', 'watch:tests']);

    // Default task.
    grunt.registerTask('default', ['test']);

    // needed to make grunt-istanbul storeReport
    grunt.event.on('jasmine.coverage', function (coverage) {
        global.__coverage__ = coverage;
    });

};
