'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync');
const del = require('del');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const usemin = require('gulp-usemin');
const rev = require('gulp-rev');
const cleanCss = require('gulp-clean-css');
const flatMap = require('gulp-flatmap');
const htmlmin = require('gulp-htmlmin');

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

gulp.task('clean', function() {
    return del(['dist/']);
});

// * copy fonts to the distribution folder 
gulp.task('copyfonts', function(done){
    gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/*.*')
    .pipe(gulp.dest('./dist/webfonts'));
    done();
});

gulp.task('imagemin', function(done){
    return gulp.src('img/*.{png,jpg,gif}')
    .pipe(imagemin({optimizationLevel: 3, progressive: true, interlaced:true}))
    .pipe(gulp.dest('dist/img'));
});


// * this takes html files and then loos up the CSS and JS blocks in the html files
gulp.task('usemin', function(){
    return gulp.src('./*.html')
    // ? flatmap - takes multiple html files and then starts up parallel pipelines for each one of these html files.
    .pipe(flatMap(function(stream, file){
        return stream
        .pipe(usemin({
            css: [rev()], 
            html: [function(){return htmlmin({collapseWhitespace:true})}],
            js:[uglify(), rev()],
            inlinejs: [uglify()],
            inlinecss: [cleanCss(), 'concat']
        }))
    }))
    .pipe(gulp.dest('dist/'));
});


gulp.task('build', gulp.series('clean','copyfonts','imagemin','usemin'));