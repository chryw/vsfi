const consolidate = require('gulp-consolidate');
const gulp = require('gulp');
const rename = require('gulp-rename');
const fs = require('fs');
const sass = require('gulp-sass');

gulp.task('map', () => {
  const items = JSON.parse(fs.readFileSync('source/data.json', 'utf8'));

  gulp.src('source/FabMDL2/**/*')
    .pipe(gulp.dest('dist/catalog'));

  gulp.src('templates/template-mapping.html')
    .pipe(consolidate('lodash', {
      items: items,
    }))
    .pipe(rename('mapping.html'))
    .pipe(gulp.dest('dist/catalog'));

  gulp.src('templates/template-mapping.scss')
    .pipe(consolidate('lodash', {
      items: items,
    }))
    .pipe(sass())
    .pipe(rename('mapping.css'))
    .pipe(gulp.dest('dist/catalog'));
});
