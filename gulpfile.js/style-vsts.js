const consolidate = require('gulp-consolidate');
const fs = require('fs');
const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('style-vsts', () => {
  const items = JSON.parse(fs.readFileSync('./source/data.json', 'utf8'));

  return gulp.src('templates/template-vsts.scss')
  .pipe(consolidate('lodash', {
    items: items,
    fontName: 'Bowtie',
    className: 'bowtie',
  }))
  .pipe(rename('_IconsCommon.scss'))
  .pipe(gulp.dest('dist/VSO'));
});
