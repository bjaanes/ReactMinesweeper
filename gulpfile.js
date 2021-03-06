'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var clean = require('gulp-clean');

gulp.task('javascript', function () {
    var b = browserify('./src/main.jsx')
        .transform("babelify", {presets: ["es2015", "react"]});

    return b.bundle()
        .pipe(source('bundle.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .on('error', gutil.log)
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./public/'));
});

gulp.task('copyhtml', function () {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./public/'));
});

gulp.task('copycss', function () {
    return gulp.src('./src/styles.css')
        .pipe(gulp.dest('./public/'));

});

gulp.task('compile', ['javascript', 'copyhtml', 'copycss']);

gulp.task('clean', function () {
    return gulp.src('./public/**/*.*', {read: false})
        .pipe(clean());
});

gulp.task('watch', ['compile'], function() {
    gulp.watch('src/**/*.*', ['compile']);
});

gulp.task('default', ['compile', 'watch']);