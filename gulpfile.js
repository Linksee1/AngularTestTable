'use strict';

var gulp = require('gulp');
var rename = require("gulp-rename");
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var imageMin = require('gulp-imagemin');
var uglify = require('gulp-uglify');

gulp.task('css', function () {
  return gulp.src([
      'bower_components/reset-css/reset.css',
      '_dev/style.scss'
  ])
    .pipe(sass.sync().on('error', swallowError))
    .pipe(sass({indentedSyntax: false}))
    .pipe(autoprefixer({
            browsers: ['> 5%', 'Firefox ESR', 'Opera 12.1'],
            cascade: false
        }))
    .pipe(concat('style.css'))
    .pipe(rename("style.css"))
    .pipe(gulp.dest('_dist/css/'))

});
gulp.task('js', function () {
    gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        '_dev/header/header.js'
    ])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(uglify())
        .pipe(gulp.dest('_dist/js'));
});

gulp.task('jade', function() {
    gulp.src('_dev/*.jade')
        .pipe(plumber())
        .pipe(jade({
            pretty: true
        }))
        .pipe(gulp.dest('_dist'))
});
gulp.task('image', function () {
    gulp.src(['_dev/img/**/*'])
        .pipe(plumber({
            handleError: function (err) {
                console.log(err);
                this.emit('end');
            }
        }))
        .pipe(imageMin())
        .pipe(gulp.dest('_dist/images'));
});

gulp.task('default', ['css', 'jade', 'js'], function () {
    gulp.watch("_dev/**/*.*css", ['css'])
    gulp.watch("_dev/**/*.jade", ['jade'])
    gulp.watch('_dev/**/*.js', ['js'])
});

function swallowError (error) {
    console.log(error.toString());
    this.emit('end');
}
