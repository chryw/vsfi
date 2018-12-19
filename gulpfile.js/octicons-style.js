const consolidate = require('gulp-consolidate');
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('octicons-style', () => {
  const items = JSON.parse(fs.readFileSync('./source/octicons.json', 'utf8'));

  return gulp.src('templates/template-octicons.scss')
  .pipe(consolidate('lodash', {
    items: items,
    fontName: 'Octicons',
    className: 'octicon',
  }))
  .pipe(rename('octicons.scss'))
  .pipe(gulp.dest('dist/octicons'))
  .pipe(sass())
  .pipe(rename('octicons.css'))
  .pipe(gulp.dest('dist/octicons'));
});
