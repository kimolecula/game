var gulp = require('gulp'),
jsValidate = require('gulp-jsvalidate'),
uglify = require('gulp-uglify'),
less = require('gulp-less'),
concatCss = require('gulp-concat-css'),
autoprefixer = require('gulp-autoprefixer'),
minifyCss = require('gulp-minify-css'),
rename = require("gulp-rename"),
cssComb = require('gulp-csscomb'),
cssCombLint = require('gulp-csscomb-lint'),
cssBeautify = require('gulp-cssbeautify'),
htmlmin = require('gulp-htmlmin');
watch = require('gulp-watch');

var pattern = ["js/**", "!js/kimolecula.js"];

gulp.task('copy-l20n', function() {
  gulp.src('l20n/**')
  .pipe(gulp.dest('dist/l20n/'));
});

gulp.task('copy-css', function() {
  gulp.src('css/*.css')
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('copy-js', function() {
  gulp.src(pattern)
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('make-less', function() {
  gulp.src('less/kml-structure-base.less')
  .pipe(less())
  .pipe(concatCss("kimolecula.css"))
  .pipe(cssComb())
  .pipe(cssBeautify({
    indent: '  ',
    openbrace: 'end-of-line',
    autosemicolon: true
  }))
  .pipe(autoprefixer({
    browsers: ['last 2 versions'],
    cascade: false
  }))
  .pipe(minifyCss({compatibility: 'ie8'}))
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(cssCombLint())
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('make-js', function () {
  return gulp.src('js/kimolecula.js')
  .pipe(jsValidate())
  .pipe(uglify())
  .pipe(rename(function (path) {
    path.basename += ".min";
  }))
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('make-html', function() {
  gulp.src('templates/html/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist/'))
});


gulp.task('watch', function() {
  gulp.watch('templates/html/*.html', ['make-html']);
  gulp.watch('js/kimolecula.js', ['make-js']);
  gulp.watch('less/*.less', ['make-less']);
  gulp.watch('css/*.css', ['copy-css']);
  gulp.watch(pattern, ['copy-js']);
  gulp.watch('l20n/**', ['copy-l20n']);
})

gulp.task('default', ['make-html', 'make-js', 'make-less', 'copy-css', 'copy-js', 'copy-l20n']);
