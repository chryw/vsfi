const gulp = require('gulp');
const rename = require('gulp-rename');
const cheerio = require('gulp-cheerio');
const raster = require('gulp-raster');

const options = {
  run: function($) {
      //set width and height to prevent raster generating wrong dimensions
      $('svg')
          .attr({
              width: 14,
              height: 14
          });
      //set icons to be default color
      $('path')
          .attr({
              fill: "#333333"
          });
      //added a transparent box to preserve padding
      $('path')
          .after(`<rect fill="none" fill-opacity="0" width="448" height="448"/>`);
  }
};

gulp.task('svg2png', function() {
    return gulp.src(['source/svgs/*.svg'])
        .pipe(cheerio(options))
        .pipe(raster({
            format: 'png'
        }))
        .pipe(rename({
            extname: '.png'
        }))
        .pipe(gulp.dest(`dist/png`));
});
