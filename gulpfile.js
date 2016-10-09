'use strict';

const gulp = require('gulp'),
  rename = require("gulp-rename"),
  autoprefixer = require('gulp-autoprefixer'),
  sass = require('gulp-sass'),
  jade = require('gulp-jade'),
  concat = require('gulp-concat'),
  plumber = require('gulp-plumber'),
  imageMin = require('gulp-imagemin'),
  cssComb = require('gulp-csscomb'),
  minifyCss = require('gulp-minify-css'),
  uglify = require('gulp-uglify'),
  htmlmin = require('gulp-htmlmin'),
  uncss = require('gulp-uncss'),
  connect = require('gulp-connect'),
  browserSync = require('browser-sync'),
  babel = require('gulp-babel'),
  reload = browserSync.reload,
  ngAnnotate = require('gulp-ng-annotate');

gulp.task('scss', () => {
  return gulp.src([
    '_dev/style.scss'
  ])
    .pipe(sass.sync().on('error', swallowError))
    .pipe(sass({indentedSyntax: false}))
    .pipe(autoprefixer({
      browsers: ['> 5%', 'Firefox ESR', 'Opera 12.1'],
      cascade: false
    }))
    .pipe(concat('style.css'))
    .pipe(cssComb())
    .pipe(minifyCss())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('_dist/css/'))

});

gulp.task('jade', () => {
  gulp.src('_dev/**/*.jade')
    .pipe(plumber())
    .pipe(jade({
      pretty: true
    }))
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('_dist'))
});
gulp.task('image', () => {
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
gulp.task('isolated-js', function () {
  gulp.src([
    '_dev/**/*.module.js',
    '_dev/**/*.config.js',
    '_dev/**/*.service.js',
    '_dev/**/component.js'
  ])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('isolated.js'))
    .pipe(gulp.dest('_dist/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('_dist/js'));
});
gulp.task('js', () => {
  gulp.src([
    "bower_components/jquery/dist/jquery.js",
    "bower_components/angular/angular.js",
    "bower_components/angular-route/angular-route.js",
    "node_modules/angular-sanitize/angular-sanitize.js"
  ])
    .pipe(plumber({
      handleError: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('_dist/js'))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('_dist/js'));
});


gulp.task('browser-sync', ['connect'], () => {
  browserSync({
    proxy: '127.0.0.1:8010',
    port: 8080,
    open: false,
    notify: false,
    reloadDelay: 500
  });
});

gulp.task('connect', () => {
  connect.server({
    root: '_dist/',
    livereload: true,
    port: '8010'
  });
});
gulp.task('build', ['scss', 'jade', 'image', 'js', 'isolated-js']);
gulp.task('default', ['browser-sync'], () => {
  gulp.watch("_dev/**/*.css", ['css']);
  gulp.watch("_dev/**/*.scss", ['scss']);
  gulp.watch("_dev/**/*.jade", ['jade']);
  gulp.watch("_dev/**/*.js", ['js', 'isolated-js']);
  gulp.watch("_dev/img/*", ['image']);
});

function swallowError(error) {
  console.log(error.toString());
  this.emit('end');
}