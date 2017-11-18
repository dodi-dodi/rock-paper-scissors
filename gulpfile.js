'use strict';

const
  gulp = require('gulp'),

  // sass
  sass = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),

  // image optimization
  image = require('gulp-image'),

  // browsersync
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,

  // jshint
  jshint = require('gulp-jshint');

// source files and directories
var src = {
    scss: 'src/scss/*.scss',
    scss_index: 'src/scss/index.scss',
    css: 'css',
    html: '*.html',
    img: ['src/img/*.png','src/img/*.jpg','src/img/*.gif','src/img/*.jpeg'],
    js: 'js/*.js'
};

// compile SCSS files to css/index.css
gulp.task('sass', function () {
  return gulp.src(src.scss_index)
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer({ browsers: ['last 2 versions'], cascade: false }))
    .pipe(gulp.dest(src.css))
    .pipe(reload({ stream: true }));
});

// watch changes in SCSS files
gulp.task('sass:watch', function () {
  gulp.watch(src.scss, ['sass']);
});

// browser sync wachting on SCSS files and html files
gulp.task('sync', ['sass:watch'], function () {
    browserSync.init({
        server: "."
    });

    gulp.watch(src.scss, ['sass']);
    gulp.watch(src.html).on('change', reload);
});

// optimize images
gulp.task('images', function(cb) {
    gulp.src(src.img)
      .pipe(image())
      .pipe(gulp.dest('./images')).on('end', cb).on('error', cb);
});

gulp.task('lint', function() {
    gulp.src(src.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'));
});

// run browser sync by default
gulp.task('default', ['sync']);
