'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');


gulp.task('sass', function(){
    // ? gulp.src() - function that takes file globs and creates a stream of objects that represent the files
    return gulp.src('./css/*.scss')
    .pipe(sass().on('error', sass.logError))    // ? pipe() - allows the stream to be piped through a function
    .pipe(gulp.dest('./css'));      // ? gulp.dest() - specifies the destination of the changes files
});


// * gulp has watch task built into it 
// * this will watch the .scss files in css folder and execute ['sass']
gulp.task('sass:watch', function(){
    gulp.watch('./css/*.scss', gulp.series(['sass']));
});

gulp.task('browser-sync', function() {
    var files = [
        './*.html',
        './css/*.css',
        './js/*.js',
        './img/*.{png,jpg,gif}'
    ];

    browserSync.init(files, {
        server: {
            baseDir: './'
        }
    });
});


// Default task
gulp.task('default', gulp.parallel('browser-sync','sass:watch'));