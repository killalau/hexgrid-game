require('babel/register');

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var gutil = require('gulp-util');
var babel = require("gulp-babel");
var concat = require('gulp-concat');

// gulp.task('build', function() {
//   return gulp.src("src/**")
//     .pipe(babel())
//     .pipe(concat('all.js'))
//     .pipe(gulp.dest("build"));
// });

gulp.task('mocha', function() {
  return gulp.src(['test/**/*.spec.js'], { read: false })
    .pipe(mocha({ require: ['./test/test_helper.js'] }))
    .on('error', gutil.log);
});

gulp.task('watch-mocha', function() {
  gulp.watch(['src/**', 'test/**'], ['mocha']);
});

gulp.task('test', ['mocha']);
gulp.task('dev', ['mocha', 'watch-mocha']);
gulp.task('default', ['dev']);
