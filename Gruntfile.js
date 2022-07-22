'use strict';
// use strict means use strict javascript code

module.exports = function(grunt) {

    const sass = require('node-sass')

    // required grunt plugins
    require('time-grunt')(grunt); //* Time how long tasks take. Can help when optimizing build times

    //* Automatically load required Grunt tasks
    //* 2nd part will inform it that useminPrepare task depends on the usemin package 
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });  
    // To do the configuration
    grunt.initConfig({

        // ! scss to css
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

        // ! to watch the scss file
        watch:{
            // watch scss files in css folder and run task 'sass'
            files: ['css/*.scss'],
            tasks: ['sass']
        },

        // ! live server
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
        },
        
        // ! copy files to the dist folder
        copy:{
            html: {
                files: [
                    {
                        expand: true,
                        cwd:'./',
                        src:['*.html'],
                        dest:'dist'
                    }
                ]
            },
            fonts: {
                files: [
                    {
                        expand: true,
                        cwd:'node_modules/@fortawesome/fontawesome-free',
                        src: ['webfonts/*.*'],
                        dest:'dist'
                    }
                ]
            }
        },

        // ! Clean the dist folder
        clean:{
            build: {
                src: ['dist/']
            }
        },

        // ! Imagemin for the images
        imagemin:{
            dynamic: {
                files: [
                    {
                        expand:true,
                        cwd:'./',
                        src:['img/*.{png,jpg,gif}'],
                        dest:'dist/'
                    }
                ]
            }
        },

        // ! usemin Prepare Task
        // * this useminPrepare will prepare the files and then also configure concat,cssmin,uglify,filerev
        useminPrepare:{
            files: {
                dest:'dist',
                src:['contactus.html', 'aboutus.html', 'index.html']
            },
            options:{
                flow:{
                    steps:{
                        css: ['cssmin'],
                        js:['uglify']
                    },
                    post: {
                        css: [
                            {
                                name: 'cssmin',
                                createConfig: function(context, block){
                                    var generated = context.options.generated;
                                    generated.options = {
                                        keepSpecialComments: 0, rebase:false
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        },

        // ! concat
        // * concat options will be configured by the useminPrepare that runs earlier
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare
            dist: {}
        },

         // ! uglify
        ulgify: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

         // ! cssmin
        cssmin: {
            // dist configuration is provided by useminPrepare
            dist: {}
        },

         // ! filerev
        //  * when usemin prepares the main.css and main.js filerev will add additional
        // * extension to the main name (so when you add a new version of a website it will add a number)
        // * this will prevent the cache problems
        filerev: {
            option: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        // ! usemin Task
        //* Replaces all assets with their revved version in html and css files.
        //* options.assetDirs contains the directories for finding the assets
        //* according to their relative paths
        usemin: {
            html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
            options:{
                // path all the html,css,js file exist
                assetsDirs: ['dist', 'dist/css','dist/js',]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace:true,
                    removeComments:true
                },
                files:{
                    // 'destination' : 'source'
                    'dist/index.html': 'dist/index.html',
                    'dist/contactus.html': 'dist/contactus.html',
                    'dist/aboutus.html': 'dist/aboutus.html',
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

    // build task
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

}