const gulp = require('gulp');
const replace = require('gulp-replace');
const hasha = require('hasha');
const del = require('del');

gulp.task('cachebust', ['iconfont', 'style-vsts', 'style-catalog', 'html-catalog', 'map'], () => {
  gulp.src(['dist/catalog/style.css'])
      .pipe(replace('@@Bowtie-eot', hasha.fromFileSync('dist/catalog/Bowtie.eot')))
      .pipe(replace('@@Bowtie-svg', hasha.fromFileSync('dist/catalog/Bowtie.svg')))
      .pipe(replace('@@Bowtie-ttf', hasha.fromFileSync('dist/catalog/Bowtie.ttf')))
      .pipe(replace('@@Bowtie-woff', hasha.fromFileSync('dist/catalog/Bowtie.woff')))
      .pipe(replace('@@FabMDL2-eot', hasha.fromFileSync('dist/catalog/FabMDL2.eot')))
      .pipe(replace('@@FabMDL2-svg', hasha.fromFileSync('dist/catalog/FabMDL2.svg')))
      .pipe(replace('@@FabMDL2-ttf', hasha.fromFileSync('dist/catalog/FabMDL2.ttf')))
      .pipe(replace('@@FabMDL2-woff', hasha.fromFileSync('dist/catalog/FabMDL2.woff')))
      .pipe(replace('@@FabMDL2-woff2', hasha.fromFileSync('dist/catalog/FabMDL2.woff2')))
      .pipe(gulp.dest('dist/catalog'));
  gulp.src(['dist/catalog/index.html','dist/catalog/mapping.html'])
      .pipe(replace('@@style-css', hasha.fromFileSync('dist/catalog/style.css')))
      .pipe(gulp.dest('dist/catalog'));
  del(['dist/VSO/Bowtie.ttf']);
});
