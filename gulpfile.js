const gulp = require('gulp');
const { parallel  } = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');

/*
  -- TOP LEVEL FUNCTIONS 
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

exports.messageStart = () => (
  console.log('Gulp says hi!')
);
exports.messageFinish = () => (
  console.log('Gulp says Bye!')
);

exports.copyHtml = () => (
  gulp.src('src/*.html')
  .pipe(gulp.dest('dist'))
);

exports.imageMin = () => (
  gulp.src('src/img/*')
      .pipe(imagemin())
      .pipe(gulp.dest('dist/img'))
);

exports.scripts = function() {
  return gulp.src('src/js/*.js')
  .pipe(concat('main.js'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js'));
}

exports.css = () => {
  return gulp.src('src/css/*.scss')
      .pipe(concat('styles.css'))
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/css'));
}

exports.default = parallel(this.messageStart, this.copyHtml, this.imageMin, this.scripts, this.css, this.messageFinish);

