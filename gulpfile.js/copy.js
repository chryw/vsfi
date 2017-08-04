const gulp = require('gulp');

//Copy some files to dist/VSO folder for check-in
gulp.task('copy', ['cachebust'], () => {
  gulp.src(['dist/_IconsCommon.scss', 'dist/Bowtie.eot', 'dist/Bowtie.svg', 'dist/Bowtie.woff'])
    .pipe(gulp.dest('dist/VSO'));
  gulp.src(['dist/Bowtie.eot', 'dist/Bowtie.svg', 'dist/Bowtie.ttf', 'dist/Bowtie.woff', 'dist/FabMDL2.eot', 'dist/FabMDL2.svg', 'dist/FabMDL2.ttf', 'dist/FabMDL2.woff', 'dist/FabMDL2.woff2', 'dist/index.html', 'dist/mapping.html', 'dist/style.css'])
    .pipe(gulp.dest('dist/catalog'));
});
