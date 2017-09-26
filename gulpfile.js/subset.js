const gulp = require('gulp');
const fs = require('fs');
const opentype = require('opentype.js');

gulp.task('subset', () => {
  opentype.load('dist/catalog/bowtie.ttf', (error, font) => {
    console.log(require('util').inspect(font, { depth: null }));  
  });
});
