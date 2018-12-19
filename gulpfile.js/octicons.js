const gulp = require('gulp');
const replace = require('gulp-replace');
const hasha = require('hasha');
const del = require('del');

gulp.task('octicons', ['octicons-fonts', 'octicons-style', 'octicons-preview'], () => {
  gulp.src(['dist/octicons/style.css'])
      .pipe(replace('@@Octicons-eot', hasha.fromFileSync('dist/octicons/octicons.eot')))
      .pipe(replace('@@Octicons-woff', hasha.fromFileSync('dist/octicons/octicons.woff')))
      .pipe(replace('@@Octicons-ttf', hasha.fromFileSync('dist/octicons/octicons.ttf')))
      .pipe(replace('@@Octicons-svg', hasha.fromFileSync('dist/octicons/octicons.svg')))
      .pipe(gulp.dest('dist/octicons'));
  gulp.src(['dist/octicons/index.html'])
      .pipe(replace('@@style-css', hasha.fromFileSync('dist/octicons/style.css')))
      .pipe(replace('@@octicons-css', hasha.fromFileSync('dist/octicons/octicons.css')))
      .pipe(gulp.dest('dist/octicons'));
});
