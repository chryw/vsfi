const gulp = require('gulp');
const replace = require('gulp-replace');
const hasha = require('hasha');

gulp.task('cachebust', ['iconfont', 'style-vsts', 'style-catalog', 'html-catalog', 'map'], () => {
  gulp.src(['dist/style.css'])
      .pipe(replace('@@Bowtie-eot', hasha.fromFileSync('dist/Bowtie.eot')))
      .pipe(replace('@@Bowtie-svg', hasha.fromFileSync('dist/Bowtie.svg')))
      .pipe(replace('@@Bowtie-ttf', hasha.fromFileSync('dist/Bowtie.ttf')))
      .pipe(replace('@@Bowtie-woff', hasha.fromFileSync('dist/Bowtie.woff')))
      .pipe(replace('@@FabMDL2-eot', hasha.fromFileSync('dist/FabMDL2.eot')))
      .pipe(replace('@@FabMDL2-svg', hasha.fromFileSync('dist/FabMDL2.svg')))
      .pipe(replace('@@FabMDL2-ttf', hasha.fromFileSync('dist/FabMDL2.ttf')))
      .pipe(replace('@@FabMDL2-woff', hasha.fromFileSync('dist/FabMDL2.woff')))
      .pipe(replace('@@FabMDL2-woff2', hasha.fromFileSync('dist/FabMDL2.woff2')))
      .pipe(gulp.dest('dist'));
  gulp.src(['dist/index.html','dist/mapping.html'])
      .pipe(replace('@@style-css', hasha.fromFileSync('dist/style.css')))
      .pipe(gulp.dest('dist'));
});
