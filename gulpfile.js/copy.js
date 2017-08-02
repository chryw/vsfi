const gulp = require('gulp');

//Copy some files to dist/VSO folder for check-in
gulp.task('copy', ['cachebust'], () => {
  gulp.src(['dist/_IconsCommon.scss', 'dist/Bowtie.eot', 'dist/Bowtie.svg', 'dist/Bowtie.woff'])
    .pipe(gulp.dest('dist/VSO'));
});
