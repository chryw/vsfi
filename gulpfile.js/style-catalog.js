const consolidate = require('gulp-consolidate');
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');
const sass = require('gulp-sass');

gulp.task('style-catalog', () => {
  const items = JSON.parse(fs.readFileSync('./source/data.json', 'utf8'));

  return gulp.src('templates/template-index.scss')
  .pipe(consolidate('lodash', {
    items: items,
    fontName: 'Bowtie',
    className: 'bowtie',
  }))
  .pipe(sass())
  .pipe(rename('style.css'))
  .pipe(gulp.dest('dist/catalog'));
});
