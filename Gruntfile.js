'use strict';
// use strict means use strict javascript code

module.exports = function(grunt) {

    const sass = require('node-sass')

    // required grunt plugins
    require('time-grunt')(grunt); //* Time how long tasks take. Can help when optimizing build times
    require('jit-grunt')(grunt);  //* Automatically load required Grunt tasks
    // To do the configuration
    grunt.initConfig({

        sass: {
            options:{
                implementation: sass, 
                sourceMap:true
            },
            dist: {
                files:{
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },

        watch:{
            // watch scss files in css folder and run task 'sass'
            files: ['css/*.scss'],
            tasks: ['sass']
        },

        browserSync:{
            dev:{
                // in here we add files to watch if one changed browser will be reloaded
               bsFiles: {
                    src:[
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
               }, 
               options: {
                    watchTask:true,
                    server:'./'
               }
            }
        }

    });

    // task name is css (this will execute the sass task inside the config)
    grunt.registerTask('css',['sass']);

    // if you are using watch task do that as the last one 
    // (because it will stop everything so others wont' be executed)
    grunt.registerTask('default', ['browserSync', 'watch']);
    // if you named a task as default you just need to type 'grunt' at the cmd

}