module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.initConfig({

        sass: {
            dist: {
                files: {
                    'dist/main.css': 'src/calend3js.scss'
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: './',
                    keepalive: true
                }
            }
        },

        jshint: {
            all: ['src/**/*.js'],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        browserify: {
            build: {
                files:  {
                    'dist/calend3js.js': ['src/calend3js.js']
                }
            },
            demo: {
                files:  {
                    'demo/demo.build.js': ['demo/demo.js']
                }
            }
        },

        clean: ['dist/calend3js.js'],

        watch: {
            js: {
                files: ['src/**/*.js'],
                tasks: ['browserify:build', 'browserify:demo'],
                options: {
                    spawn: false,
                }
            },
            css: {
                files: ['src/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            },
            demo: {
                files: ['demo/*.js'],
                tasks: ['browserify:demo'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.registerTask('build', ['clean', 'jshint', 'sass', 'browserify', 'watch']);
    grunt.registerTask('default', ['build']);
};