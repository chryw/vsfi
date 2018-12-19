const consolidate = require('gulp-consolidate');
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');
const merge2 = require('merge2');

gulp.task('octicons-preview', () => {
  const items = JSON.parse(fs.readFileSync('./source/octicons.json', 'utf8'));

  return merge2([
    gulp.src('templates/template-preview.scss')
      .pipe(sass())
      .pipe(rename('style.css'))
      .pipe(gulp.dest('dist/octicons')),
    gulp.src('templates/template-octicons.html')
      .pipe(consolidate('lodash', {
        items: items,
        fontName: 'Octicons',
        className: 'octicon',
      }))
      .pipe(rename('index.html'))
      .pipe(gulp.dest('dist/octicons'))
  ]);
});
