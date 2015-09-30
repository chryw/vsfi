var gulp = require("gulp");
var rename = require("gulp-rename");
var iconfont = require('gulp-iconfont');
var consolidate = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now() / 1000);

var fontName = 'vsfi'; // set name of your symbol font
var template = 'fontawesome-style'; // you can also choose 'foundation-style'
gulp.task('iconfont', function() {
  gulp.src(['assets/icons/*.svg'])
    .pipe(iconfont({
      fontName: fontName,
      appendUnicode: true, // recommended option
      formats: ['ttf', 'eot', 'woff', 'woff2', 'svg'], // default, 'woff2' and 'svg' are available
      timestamp: runTimestamp, // recommended to get consistent builds when watching files
    }))
    .on('glyphs', function(glyphs) {
      var options = {
        glyphs: glyphs.map(function(glyph) {
          // this line is needed because gulp-iconfont has changed the api from 2.0
          return {
            name: glyph.name,
            codepoint: glyph.unicode[0].charCodeAt(0)
          }
        }),
        fontName: fontName,
        fontPath: 'assets/fonts/', // set path to font (from your CSS file if relative)
        className: 'vsfi' // set class name in your CSS
      };
      // CSS templating
      gulp.src('templates/' + template + '.css')
        .pipe(consolidate('lodash', options))
        .pipe(rename({
          basename: fontName
        }))
        .pipe(gulp.dest('.')); // set path to export your CSS
        // HTML templating
      gulp.src('templates/' + template + '.html')
        .pipe(consolidate('lodash', options))
        .pipe(rename({ basename:fontName}))
        .pipe(gulp.dest('/')); // set path to export your sample HTML
      console.log(glyphs);
    })
    .pipe(gulp.dest('assets/fonts/')); // set path to export your fonts
});
